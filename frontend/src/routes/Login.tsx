import axios from "axios";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  useLayoutEffect(() => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");
    console.log(userId, token);

    if (userId && token) {
      window.location.href = "/";
    }
  }, []);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [isFilled, setIsFilled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [whatIsTheError, setWhatIsTheError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(userDetails.email && userDetails.password)) {
      setIsFilled(true);
      setTimeout(() => {
        setIsFilled(false);
      }, 3000);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_CLASSROOM_BACKEND_URI}/post/login`,
        userDetails,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setUserDetails({ email: "", password: "", role: "" });
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          window.location.href = "/";
        }, 3000);
      }
    } catch ({
      response: {
        data: { error },
      },
    }: any) {
      setWhatIsTheError(error || "An Unexpected Error Occurred!");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <section className="min-h-screen w-screen bg-slate-900 text-white tracking-wider overflow-x-hidden relative">
      <div className="h-full w-full flex items-center flex-col gap-10">
        <h1 className="text-7xl mt-12 bg-gradient-to-br from-orange-400 font-bold py-4 to-violet-500 bg-clip-text text-transparent">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col border-2 border-slate-700 lg:w-4/12 p-8 rounded-xl gap-4 bg-slate-800 shadow-xl shadow-black"
        >
          <div className="flex flex-col gap-4 text-base">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                className="border-2 border-slate-700 rounded-md px-2 py-1.5 bg-transparent text-slate-400 outline-none"
                value={userDetails.email}
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                className="border-2 border-slate-700 rounded-md px-2 py-1.5 bg-transparent text-slate-400 outline-none"
                value={userDetails.password}
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                className="bg-black rounded-md border-2 shadow-md shadow-amber-800 border-amber-800 px-1.5 py-2 mb-4 cursor-pointer text-amber-400 outline-none h-fit"
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    role: e.target.value,
                  });
                }}
                value={userDetails.role}
              >
                <option value="" disabled>
                  Select a Role
                </option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 border-2 my-4 w-full border-green-500 text-white text-lg rounded-md px-2 py-1.5 hover:bg-transparent hover:text-green-500"
          >
            Login
          </button>
          <div className="flex-center flex-col border-t-2 pt-6 gap-2">
            <p className="w-full text-center">
              No account?{" "}
              <span className="border-b-2">
                Please contact your administrator!
              </span>
            </p>
          </div>
        </form>
      </div>
      <div
        className={`bg-red-500 rounded-md text-white border-2 border-red-500 w-fit px-2 py-1.5 flex-center gap-1 mt-10 absolute top-[40%] right-0 ${
          isFilled ? "translate-x-[1%]" : "translate-x-[105%]"
        } transition-transform duration-1000 ease-in-out`}
        style={{ boxShadow: "0px 0px 10px 2px black" }}
      >
        <CircleX />
        <div>Please Fill All Details!</div>
      </div>
      <div
        className={`bg-red-500 rounded-l-md text-white border-2 border-red-500 w-fit px-2 py-1.5 flex-center gap-1 mt-10 absolute top-[40%] right-0 ${
          isError ? "translate-x-[1%]" : "translate-x-[105%]"
        } transition-transform duration-1000 ease-in-out`}
        style={{ boxShadow: "0px 0px 10px 2px black" }}
      >
        <CircleX />
        <div>{whatIsTheError}</div>
      </div>
      <div
        className={`bg-green-600 rounded-r-md text-white border-2 border-green-600 w-fit px-2 py-1.5 flex-center gap-1 mt-10 absolute top-[40%] left-0 ${
          isSuccess ? "-translate-x-[1%]" : "-translate-x-[105%]"
        } transition-transform duration-1000 ease-in-out`}
        style={{ boxShadow: "0px 0px 10px 2px black" }}
      >
        <div>Successfully Logged In!</div>
        <CircleCheckBig />
      </div>
    </section>
  );
};

export default Login;
