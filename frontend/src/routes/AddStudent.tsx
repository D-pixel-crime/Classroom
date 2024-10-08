import { useContext, useLayoutEffect, useState } from "react";
import MainContainer from "../containers/MainContainer";
import { Plus, Trash } from "lucide-react";
import { ErrorContext } from "../contexts/ErrorContextProvider";
import axios from "axios";
import { ConfirmationContext } from "../contexts/ConfirmationContextProvider";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const AddStudent = () => {
  const [students, setStudents] = useState([{ email: "", password: "" }]);
  const errorContext = useContext(ErrorContext);
  const { setIsError, setWhatIsTheError } = errorContext!;
  const confirmationContext = useContext(ConfirmationContext);
  const { setIsConfirmed } = confirmationContext!;
  const userId = Cookies.get("userId");
  const role = Cookies.get("role");
  const adminId = useParams().userId;

  useLayoutEffect(() => {
    if (!(userId === adminId && (role === "Admin" || role === "Teacher"))) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async () => {
    if (students.length === 0) {
      setWhatIsTheError("No students to add");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      return;
    }

    for (const eachStudent of students) {
      if (eachStudent.email === "" || eachStudent.password === "") {
        setWhatIsTheError("Please enter all details");
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
        return;
      }
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_CLASSROOM_BACKEND_URI}/post/new-students`,
        { students },
        { withCredentials: true }
      );

      setStudents([{ email: "", password: "" }]);
      setIsConfirmed(true);
      setTimeout(() => {
        setIsConfirmed(false);
      }, 3000);
    } catch (error: any) {
      setWhatIsTheError(
        error.response?.data?.error ||
          error.message ||
          "An unexpected error occurred"
      );
    }
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    setStudents((prevStudents) =>
      prevStudents.map((eachStudent, i) =>
        i === index ? { ...eachStudent, [field]: value } : eachStudent
      )
    );
  };

  return (
    <MainContainer>
      <div className="text-white w-full flex flex-col gap-16">
        <div className="flex-col flex gap-5 items-center w-full">
          <h1 className="text-5xl bg-gradient-to-tr from-red-500 via-yellow-500 to-red-500 bg-clip-text w-fit text-transparent">
            Add Students
          </h1>
          <p className="text-slate-500">Create new student accounts 🧑‍🎓</p>
        </div>
        <div>
          <form
            onSubmit={(e) => e.preventDefault()}
            method="post"
            className="flex-col flex gap-10 w-full"
          >
            <div className="flex justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="w-fit border-2 rounded-md p-1.5 bg-green-600 border-green-600 hover:text-green-500 hover:bg-transparent"
              >
                Create Accounts
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStudents([...students, { email: "", password: "" }]);
                }}
                className="w-fit border-2 rounded-md p-1.5 bg-blue-500 border-blue-500 hover:text-blue-500 hover:bg-transparent"
              >
                <Plus />
              </button>
            </div>
            {students.map((eachStudent, index) => (
              <div key={index} className="flex-center gap-10 w-full px-10">
                <div className="flex-center gap-2 w-full">
                  <label
                    htmlFor={`email${index + 1}`}
                    className="text-slate-500"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    id={`email${index + 1}`}
                    placeholder="Enter email"
                    className="bg-slate-700 text-white rounded-md px-2 py-1 w-full outline-none"
                    value={eachStudent.email}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                  />
                </div>
                <div className="flex-center gap-2 w-full">
                  <label
                    htmlFor={`password${index + 1}`}
                    className="text-slate-500"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    id={`password${index + 1}`}
                    placeholder="Enter password"
                    className="bg-slate-700 text-white rounded-md px-2 py-1 w-full outline-none"
                    value={eachStudent.password}
                    onChange={(e) =>
                      handleInputChange(index, "password", e.target.value)
                    }
                  />
                </div>
                <div className="flex-center gap-4">
                  <button
                    className="w-fit border-2 rounded-md p-1.5 bg-red-500 border-red-500 hover:text-red-500 hover:bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      setStudents(students.filter((_, i) => i !== index));
                    }}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>
    </MainContainer>
  );
};

export default AddStudent;
