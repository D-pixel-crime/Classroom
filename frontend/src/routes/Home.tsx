import { Suspense, useContext, useLayoutEffect, useState } from "react";
import MainContainer from "../containers/MainContainer";
import { ErrorContext } from "../contexts/ErrorContextProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

interface classProps {
  name: string;
  _id: string;
}

const Home = () => {
  const [classes, setClasses] = useState<classProps[]>([]);
  const errorContext = useContext(ErrorContext);
  const { setWhatIsTheError, setIsError } = errorContext!;
  const userId = Cookies.get("userId");

  useLayoutEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_CLASSROOM_BACKEND_URI}/get/get-classes`,
          { withCredentials: true }
        );

        setClasses(data.classes);
        console.log(data.classes);
      } catch (error: any) {
        setWhatIsTheError(
          error.response?.data?.message ||
            error.message ||
            "An Unexpected Error occurred"
        );
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    };

    fetchClasses();
  }, []);

  return (
    <MainContainer>
      <div className="w-full text-white">
        <div className="flex flex-col gap-5">
          <div className="text-6xl border-b-2 border-b-slate-600 pb-2 ">
            <h1 className="bg-gradient-to-r from-blue-500 via-cyan-500 to-yellow-500 bg-clip-text text-transparent w-fit">
              Classrooms
            </h1>
          </div>
          <Suspense
            fallback={<p className="text-xl text-green-500">Loading...</p>}
          >
            <div className="mt-5 px-10">
              {classes.length === 0 && (
                <p className="text-slate-400 text-xl">No Classes to Display.</p>
              )}

              {classes.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {classes.map((eachClass) => (
                    <Link
                      key={eachClass._id}
                      to={`/classroom/${userId}/${eachClass._id}`}
                      className="border-2 border-green-700 bg-green-900/40 rounded-md px-4 py-5 flex flex-col shadow-lg shadow-green-800 hover:-translate-y-[5%] hover:scale-105 transition-transform"
                    >
                      <p className="border-b text-slate-400 border-b-slate-700 mb-4">
                        Name
                      </p>
                      <p className="text-lg text-green-400">{eachClass.name}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Suspense>
        </div>
      </div>
    </MainContainer>
  );
};
export default Home;
