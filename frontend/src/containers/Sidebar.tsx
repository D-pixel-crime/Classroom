import {
  CircleUserRound,
  GraduationCap,
  Library,
  LogIn,
  LogOut,
  Pen,
  UserPlus,
  X,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import ManageTeachers from "../modals/ManageTeachers";
import ManageStudents from "../modals/ManageStudents";

interface sidebarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({ isMenuOpen, setIsMenuOpen }: sidebarProps) => {
  const role = Cookies.get("role");
  const email = Cookies.get("email");
  const userId = Cookies.get("userId");
  const { pathname } = useLocation();
  const [isManageTeacherOpen, setIsManageTeacherOpen] = useState(false);
  const [isManageStudentOpen, setIsManageStudentOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-screen max-sm:w-1/2 w-1/4 bg-slate-800 z-40 text-white ${
          !isMenuOpen ? "translate-x-[100%]" : "translate-x-0"
        } transition-transform duration-500 px-4 py-2 shadow-xl shadow-black flex`}
      >
        <X
          onClick={() => setIsMenuOpen(false)}
          className="text-red-500 w-fit size-10 hover:cursor-pointer"
        />
        <div className="flex flex-col justify-evenly">
          <div className="flex-center flex-col gap-12">
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
            {role === "Admin" && (
              <div
                className={`hover:text-green-300 transition hover:-translate-y-[5%] text-fuchsia-400`}
              >
                <button
                  className={`flex-center gap-1.5`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    setIsManageTeacherOpen(true);
                  }}
                >
                  <Pen />
                  Manage Teachers
                </button>
              </div>
            )}
            {(role === "Teacher" || role === "Admin") && (
              <div
                className={`hover:text-green-300 transition hover:-translate-y-[5%] text-fuchsia-400`}
              >
                <button
                  className={`flex-center gap-1.5`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    setIsManageStudentOpen(true);
                  }}
                >
                  <Pen />
                  Manage Students
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6 border-t-2 border-t-slate-500 pt-4">
            <div>
              {email ? (
                <div className="flex-center flex-col gap-1 break-words w-full max-sm:text-xs hover:text-cyan-400 text-indigo-400">
                  <CircleUserRound />
                  {email}
                </div>
              ) : (
                <div className="flex-center gap-1">
                  <p>Login</p>
                  <LogIn />
                </div>
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                Cookies.remove("email");
                Cookies.remove("role");
                Cookies.remove("userId");
                Cookies.remove("token");
              }}
              className="flex-center gap-2 text-white border-2 rounded-md border-red-500 bg-red-500 hover:text-red-400 hover:bg-transparent px-2 py-1.5"
            >
              Logout
              <LogOut />
            </button>
          </div>
        </div>
      </div>
      {isManageTeacherOpen && (
        <ManageTeachers setIsOpen={setIsManageTeacherOpen} />
      )}
      {isManageStudentOpen && (
        <ManageStudents setIsOpen={setIsManageStudentOpen} />
      )}
    </>
  );
};
export default SideBar;
