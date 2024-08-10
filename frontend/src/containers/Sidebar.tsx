import {
  CircleUserRound,
  GraduationCap,
  Library,
  LogIn,
  UserPlus,
  X,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

interface sidebarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({ isMenuOpen, setIsMenuOpen }: sidebarProps) => {
  const role = Cookies.get("role");
  const email = Cookies.get("email");
  const userId = Cookies.get("userId");
  const { pathname } = useLocation();

  return (
    <div
      className={`fixed top-0 right-0 h-screen max-sm:w-1/2 w-1/4 bg-slate-800 z-40 text-white ${
        !isMenuOpen ? "translate-x-[100%]" : "translate-x-0"
      } transition-transform duration-500 px-4 py-2 shadow-xl shadow-black`}
    >
      <X
        onClick={() => setIsMenuOpen(false)}
        className="text-red-500 w-fit size-10 hover:cursor-pointer"
      />
      <div className="flex-center flex-col text- gap-36 h-full">
        {role === "Admin" && (
          <div
            className={`${
              pathname.startsWith("/create-classroom")
                ? "border-b-4 hover:cursor-default py-1 text-green-400"
                : "hover:text-green-300 transition hover:-translate-y-[5%]"
            } border-green-500`}
          >
            <Link
              to={`/create-classroom/${userId}`}
              className={`${
                pathname.startsWith("/create-classroom")
                  ? "hover:cursor-default"
                  : ""
              }  flex-center gap-1.5`}
            >
              <Library />
              Create Classroom
            </Link>
          </div>
        )}
        {role === "Admin" && (
          <div
            className={`${
              pathname.startsWith("/add-teacher")
                ? "border-b-4 hover:cursor-default py-1 text-green-400"
                : "hover:text-green-300 transition hover:-translate-y-[5%]"
            } border-green-500`}
          >
            <Link
              to={`/add-teacher/${userId}`}
              className={`${
                pathname.startsWith("/add-teacher")
                  ? "hover:cursor-default"
                  : ""
              }  flex-center gap-1.5`}
            >
              <UserPlus />
              Add Teacher
            </Link>
          </div>
        )}
        {(role === "Teacher" || role === "Admin") && (
          <div
            className={`${
              pathname.startsWith("/add-student")
                ? "border-b-4 hover:cursor-default py-1 text-green-400"
                : "hover:text-green-300 transition hover:-translate-y-[5%]"
            } border-green-500`}
          >
            <Link
              to={`/add-student/${userId}`}
              className={`${
                pathname.startsWith("/add-student")
                  ? "hover:cursor-default"
                  : ""
              }  flex-center gap-1.5`}
            >
              <GraduationCap />
              Add Student
            </Link>
          </div>
        )}
        <div
          className={`${
            pathname.startsWith("/profile")
              ? "border-b-4 hover:cursor-default text-cyan-400 py-1"
              : !email
              ? "text-green-600 hover:text-green-300"
              : "hover:text-cyan-400 text-indigo-400 hover:-translate-y-[5%]"
          } border-cyan-400 transition`}
        >
          <Link
            to={email ? `/profile/${userId}` : "/login"}
            className={`${
              pathname.startsWith("/profile") ? "hover:cursor-default" : ""
            }`}
          >
            {email ? (
              <div className="flex-center flex-col gap-1 break-words w-full max-sm:text-xs">
                <CircleUserRound />
                {email}
              </div>
            ) : (
              <div className="flex-center gap-1">
                <p>Login</p>
                <LogIn />
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
