import {
  Dispatch,
  SetStateAction,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { ErrorContext } from "../contexts/ErrorContextProvider";
import axios from "axios";
import { X } from "lucide-react";
import Cookies from "js-cookie";

interface teacherProps {
  email: string;
  _id: string;
}

interface paramProps {
  alreadyAssigned: string | undefined | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  classId: string | undefined;
}

const AssignTeacherModal = ({
  alreadyAssigned,
  classId,
  setIsOpen,
}: paramProps) => {
  const [allTeachers, setAllTeachers] = useState<teacherProps[]>([]);
  const [assignedTeacher, setAssignedTeacher] = useState({
    email: "",
    _id: "",
  });
  const errorContext = useContext(ErrorContext);
  const { setIsError, setWhatIsTheError } = errorContext!;
  const userId = Cookies.get("userId");

  useLayoutEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_CLASSROOM_BACKEND_URI
          }/get/teachers-for-assign`,
          { withCredentials: true }
        );
        setAllTeachers(data.teachers);
        console.log(data.teachers);
      } catch (error: any) {
        setWhatIsTheError(
          error.response.data.error ||
            error.message ||
            "An Unexpected Error Occurred"
        );
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    };

    fetchDetails();
  }, []);

  const changeTeacher = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_CLASSROOM_BACKEND_URI}/patch/change-teacher`,
        {
          classId,
          prevTeacherId: alreadyAssigned,
          teacherId: assignedTeacher._id,
        },
        { withCredentials: true }
      );

      window.location.href = `/classroom/${userId}/${classId}`;
    } catch (error: any) {
      setWhatIsTheError(
        error.response?.data?.error ||
          error.message ||
          "An unexpected error occurred!"
      );
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <div className="fixed flex-center flex-col top-0 left-0 w-screen h-screen bg-black z-50 bg-opacity-70 text-white">
      <div className="border-2 border-slate-600 rounded-md p-4 bg-slate-800 flex-col flex gap-5">
        <div className="flex justify-end mb-2 text-red-500">
          <X
            className="hover:cursor-pointer hover:scale-125 hover:text-red-400 transition"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="select-teacher">Select Teacher</label>
          <select
            name="select-teacher"
            id="select-teacher"
            className="bg-black rounded-md border-2 shadow-md shadow-cyan-800 border-cyan-800 px-1.5 py-2 mb-4 cursor-pointer text-cyan-500 outline-none h-fit w-fit"
            value={assignedTeacher._id}
            onChange={(e) => {
              const teacher = allTeachers.find(
                (teacher) => teacher._id === e.target.value
              );
              if (teacher) {
                setAssignedTeacher(teacher);
              }
            }}
          >
            <option value="" disabled>
              Select a teacher
            </option>
            {allTeachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.email}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            changeTeacher();
          }}
          className="flex-center border-2 rounded-md border-green-600 bg-green-600 hover:text-green-400 hover:bg-transparent px-2 py-1.5"
        >
          Assign/Change
        </button>
      </div>
    </div>
  );
};
export default AssignTeacherModal;
