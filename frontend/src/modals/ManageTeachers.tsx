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

interface teacherProps {
  email: string;
  _id: string;
}

interface paramProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ManageTeachers = ({ setIsOpen }: paramProps) => {
  const [allTeachers, setAllTeachers] = useState<teacherProps[]>([]);
  const [assignedTeacher, setAssignedTeacher] = useState({
    email: "",
    _id: "",
  });
  const [password, setPassword] = useState("");
  const errorContext = useContext(ErrorContext);
  const { setIsError, setWhatIsTheError } = errorContext!;

  useLayoutEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_CLASSROOM_BACKEND_URI}/get/all-teachers`,
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

  const updateTeacher = async () => {
    if (assignedTeacher.email.length === 0) {
      setWhatIsTheError("Please fill all the details");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      return;
    }

    try {
      await axios.patch(
        `${import.meta.env.VITE_CLASSROOM_BACKEND_URI}/patch/update-teacher/${
          assignedTeacher._id
        }`,
        { email: assignedTeacher.email, password },
        { withCredentials: true }
      );

      window.location.reload();
    } catch (error: any) {
      setWhatIsTheError(
        error.response?.data?.error ||
          error.message ||
          "An Unexpected Error Occurred"
      );
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const deleteTeacher = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_CLASSROOM_BACKEND_URI}/delete/delete-teacher/${
          assignedTeacher._id
        }`,
        { withCredentials: true }
      );

      window.location.reload();
    } catch (error: any) {
      setWhatIsTheError(
        error.response?.data?.error ||
          error.message ||
          "An Unexpected Error Occurred"
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
        <h1 className="border-b-2 pb-2 border-b-slate-600">Manage Teachers</h1>
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
            {allTeachers &&
              allTeachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.email}
                </option>
              ))}
          </select>
        </div>
        {assignedTeacher.email.length > 0 && (
          <form action="post" className="flex-center flex-col gap-4 text-base">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Change the email address"
                value={assignedTeacher.email}
                onChange={(e) =>
                  setAssignedTeacher({
                    ...assignedTeacher,
                    email: e.target.value,
                  })
                }
                className="border-2 border-slate-700 rounded-md px-2 py-1.5 bg-transparent text-slate-400 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Change the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-slate-700 rounded-md px-2 py-1.5 bg-transparent text-slate-400 outline-none"
              />
            </div>
          </form>
        )}
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.preventDefault();
              updateTeacher();
            }}
            className="flex-center border-2 rounded-md border-blue-600 bg-blue-600 hover:text-blue-400 hover:bg-transparent px-2 py-1.5"
          >
            Update
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteTeacher();
            }}
            className="flex-center border-2 rounded-md border-red-600 bg-red-600 hover:text-red-400 hover:bg-transparent px-2 py-1.5"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ManageTeachers;
