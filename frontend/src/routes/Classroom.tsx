import { useContext, useLayoutEffect, useState } from "react";
import MainContainer from "../containers/MainContainer";
import { useParams } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContextProvider";
import axios from "axios";
import { Plus, Trash } from "lucide-react";
import { ConfirmationContext } from "../contexts/ConfirmationContextProvider";
import AssignTeacherModal from "../modals/AssignTeacherModal";
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

  const updateClassroom = async () => {
    const toSendData = {
      name: classDetails?.name,
      teacher: classDetails?.teacher,
      students: classDetails?.students.map((student) => student._id),
    };

    try {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_CLASSROOM_BACKEND_URI
        }/patch/update-classroom/${classId}`,
        toSendData,
        { withCredentials: true }
      );

      setClassDetails(data.classDetails);
      setIsConfirmed(true);
      setTimeout(() => {
        setIsConfirmed(false);
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

  const removeStudentFromClass = async (
    studentId: string,
    email: string,
    classrooms: [string]
  ) => {
    const updatedStudent = {
      email,
      classrooms: classrooms.filter((classroom) => classroom !== classId),
    };

    const updatedClass = {
      name: classDetails?.name,
      dayAndTime: classDetails?.dayAndTime,
      teacher: classDetails?.teacher,
      students: classDetails?.students.filter(
        (student) => student._id !== studentId
      ),
    };

    try {
      await axios.patch(
        `${
          import.meta.env.VITE_CLASSROOM_BACKEND_URI
        }/patch/update-student/${studentId}`,
        updatedStudent,
        { withCredentials: true }
      );

      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_CLASSROOM_BACKEND_URI
        }/patch/update-classroom/${classId}`,
        updatedClass,
        { withCredentials: true }
      );

      setClassDetails(data.classDetails);
      setIsConfirmed(true);
      setTimeout(() => {
        setIsConfirmed(false);
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
        <h1 className="text-4xl border-b-2 border-b-slate-600 pb-2">
          {classDetails?.name}
        </h1>
        <div className="flex items-center justify-between px-10">
          <div className="flex-center">
            <h2 className="text-2xl">Teacher: </h2>
            <p className="ml-5 text-slate-400">
              {classDetails?.teacher
                ? classDetails.teacher.email
                : "Not Assigned"}
            </p>
          </div>
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
        <div className="px-10 mt-10">
          <div className="border-b-2 border-slate-600 pb-2 mb-6 flex items-center justify-between">
            <h2 className="text-2xl">Students: </h2>
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
          </div>
          <div>
            {classDetails?.students?.length! < 1 && (
              <p className="text-slate-400 text-xl">
                No Students in this Class
              </p>
            )}
            {classDetails?.students?.length! > 0 && (
              <ul className="list-inside grid grid-cols-3 gap-4">
                {classDetails?.students.map((eachStudent) => (
                  <li
                    key={eachStudent._id}
                    className="border-2 border-amber-500 rounded-md shadow-md shadow-amber-500 px-1 py-3 flex items-center justify-around"
                  >
                    {eachStudent.email}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeStudentFromClass(
                          eachStudent._id,
                          eachStudent.email,
                          eachStudent.classrooms
                        );
                      }}
                      className="flex-center border-2 rounded-md border-red-500 bg-red-500 hover:text-red-400 hover:bg-transparent px-2 py-1.5"
                    >
                      <Trash />
                    </button>
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
