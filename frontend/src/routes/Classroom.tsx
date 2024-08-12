import { useContext, useLayoutEffect, useState } from "react";
import MainContainer from "../containers/MainContainer";
import { useParams } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContextProvider";
import axios from "axios";
import { Plus, Trash } from "lucide-react";
import { ConfirmationContext } from "../contexts/ConfirmationContextProvider";
import AssignTeacherModal from "../modals/AssignTeacherModal";
import Cookies from "js-cookie";
import StudentForClassModal from "../modals/StudentForClassModal";

interface classDetailsProps {
  name: string;
  dayAndTime: [];
  teacher: { email: string; _id: string; assigned: string };
  students: { email: string; _id: string; classrooms: [string] }[];
}

const Classroom = () => {
  const [classDetails, setClassDetails] = useState<classDetailsProps>();
  const { classId } = useParams();
  const errorContext = useContext(ErrorContext);
  const { setIsError, setWhatIsTheError } = errorContext!;
  const confirmationContext = useContext(ConfirmationContext);
  const { setIsConfirmed } = confirmationContext!;
  const [teacherOpen, setTeacherOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  const role = Cookies.get("role");

  useLayoutEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_CLASSROOM_BACKEND_URI}/get/class/${classId}`,
          { withCredentials: true }
        );

        console.log(data);
        setClassDetails(data.classDetails);
      } catch (error: any) {
        setWhatIsTheError(
          error.response?.data?.error ||
            error.message ||
            "An Unexpected Error Occurred"
        );
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
          window.location.href = "/";
        }, 3000);
      }
    };
    fetchDetails();
  }, []);

  const removeStudentFromClass = async (studentId: string) => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_CLASSROOM_BACKEND_URI
        }/patch/remove-student-from-class/`,
        { classId, studentId },
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

  const unassignTeacher = async () => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_CLASSROOM_BACKEND_URI
        }/patch/unassign-teacher/${classId}`,
        { teacherId: classDetails?.teacher },
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

  const deleteClassroom = async () => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_CLASSROOM_BACKEND_URI
        }/delete/delete-classroom/${classId}`,
        { withCredentials: true }
      );

      window.location.href = "/";
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

  const updateClassroom = async () => {
    const toSendData = {
      name: classDetails?.name,
      teacher: classDetails?.teacher._id,
      dayAndTime: classDetails?.dayAndTime,
      students: classDetails?.students.map((eachStudent) => eachStudent._id),
    };

    try {
      await axios.patch(
        `${
          import.meta.env.VITE_CLASSROOM_BACKEND_URI
        }/patch/update-classroom/${classId}`,
        toSendData,
        { withCredentials: true }
      );

      setIsConfirmed(true);
      setTimeout(() => {
        setIsConfirmed(false);
        window.location.reload();
      }, 3000);
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
    <MainContainer>
      <div className="text-white flex flex-col gap-10">
        <h1 className="border-b-2 border-b-slate-600 pb-2 flex items-center justify-between">
          {role === "Admin" ? (
            <input
              className="text-4xl border-b-2 border-slate-400 px-2 py-1.5 bg-transparent text-slate-400 outline-none bg-gradient-to-tr from-cyan-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent w-fit"
              value={classDetails?.name}
              onChange={(e) => {
                if (classDetails) {
                  setClassDetails({ ...classDetails, name: e.target.value });
                }
              }}
            />
          ) : (
            <h1 className="text-4xl bg-gradient-to-tr from-blue-500 via-cyan-500 to-yellow-500 bg-clip-text text-transparent w-fit">
              {classDetails?.name}
            </h1>
          )}
          {role === "Admin" && (
            <div className="flex-center gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  updateClassroom();
                }}
                className="flex-center border-2 rounded-md border-fuchsia-500 bg-fuchsia-500 hover:text-fuchsia-400 hover:bg-transparent px-2 py-1.5"
              >
                Update
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteClassroom();
                }}
                className="flex-center border-2 rounded-md border-red-500 bg-red-500 hover:text-red-400 hover:bg-transparent px-2 py-1.5"
              >
                Delete Classroom
              </button>
            </div>
          )}
        </h1>
        <div className="flex items-center justify-between px-10">
          <div className="flex-center">
            <h2 className="text-2xl">Teacher: </h2>
            <p className="ml-5 text-cyan-400 text-lg">
              {classDetails?.teacher
                ? classDetails.teacher.email
                : "Not Assigned"}
            </p>
          </div>
          {role === "Admin" && (
            <div className="flex-center gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  unassignTeacher();
                }}
                className="flex-center border-2 rounded-md border-red-500 bg-red-500 hover:text-red-400 hover:bg-transparent px-2 py-1.5"
              >
                Unassign
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setTeacherOpen(true);
                }}
                className="flex-center border-2 rounded-md border-purple-500 bg-purple-500 hover:text-purple-400 hover:bg-transparent px-2 py-1.5"
              >
                Assign/Change
              </button>
            </div>
          )}
        </div>
        <div className="px-10 mt-10">
          <div className="border-b-2 border-slate-600 pb-2 my-6 flex items-center justify-between">
            <h2 className="text-2xl">Students </h2>
            {(role === "Admin" || role === "Teacher") && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStudentOpen(true);
                }}
                className="flex-center gap-2 border-2 rounded-md border-blue-500 bg-blue-500 hover:text-blue-400 hover:bg-transparent px-2 py-1.5"
              >
                Add Student
                <Plus />
              </button>
            )}
          </div>
          <div>
            {classDetails?.students?.length! < 1 && (
              <p className="text-slate-400 text-xl">
                No Students in this Class
              </p>
            )}
            {classDetails?.students?.length! > 0 && (
              <ul className="list-inside grid grid-cols-4 gap-4">
                {classDetails?.students.map((eachStudent) => (
                  <li
                    key={eachStudent._id}
                    className="border-2 mb-2 border-green-800 rounded-md shadow-md shadow-green-800 px-2 py-3 flex items-center justify-between"
                  >
                    {eachStudent.email.substring(0, 25)}
                    {(role === "Admin" || role === "Teacher") && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeStudentFromClass(eachStudent._id);
                        }}
                        className="flex-center border-2 rounded-md border-red-500 bg-red-500 hover:text-red-400 hover:bg-transparent px-2 py-1.5"
                      >
                        <Trash />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {teacherOpen && (
        <AssignTeacherModal
          alreadyAssigned={classDetails?.teacher?._id || null}
          setIsOpen={setTeacherOpen}
          classId={classId}
        />
      )}
      {studentOpen && (
        <StudentForClassModal setIsOpen={setStudentOpen} classId={classId} />
      )}
    </MainContainer>
  );
};
export default Classroom;
