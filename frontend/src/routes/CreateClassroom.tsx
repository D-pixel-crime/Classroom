import { useContext, useLayoutEffect, useState } from "react";
import MainContainer from "../containers/MainContainer";
import { PlusCircle, Trash } from "lucide-react";
import { ErrorContext } from "../contexts/ErrorContextProvider";
import { ConfirmationContext } from "../contexts/ConfirmationContextProvider";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const CreateClassroom = () => {
  const [classroom, setClassroom] = useState({
    name: "",
    dayAndTime: [{ day: "", from: "", to: "" }],
  });
  const errorContext = useContext(ErrorContext);
  const { setIsError, setWhatIsTheError } = errorContext!;
  const confirmationContext = useContext(ConfirmationContext);
  const { setIsConfirmed } = confirmationContext!;
  const userId = Cookies.get("userId");
  const role = Cookies.get("role");
  const { adminId } = useParams();

  useLayoutEffect(() => {
    if (!(userId === adminId && role === "Admin")) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async () => {
    if (classroom.name === "") {
      setWhatIsTheError("Please enter all details");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      return;
    }
    for (const eachDayAndTime of classroom.dayAndTime) {
      if (!(eachDayAndTime.day && eachDayAndTime.from && eachDayAndTime.to)) {
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
        `${import.meta.env.VITE_CLASSROOM_BACKEND_URI}/post/new-classroom`,
        { name: classroom.name, dayAndTime: classroom.dayAndTime },
        { withCredentials: true }
      );

      setClassroom({ name: "", dayAndTime: [{ day: "", from: "", to: "" }] });
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

  return (
    <MainContainer>
      <div className="text-white w-full flex flex-col gap-16">
        <div className="flex-col flex gap-5 items-center w-full">
          <h1 className="text-5xl bg-gradient-to-tr from-cyan-500 via-yellow-500 to-red-500 bg-clip-text w-fit text-transparent">
            New Classroom
          </h1>
          <p className="text-slate-500">
            Create new classroom🏫 and set its timings. You can assign teacher
            and students after creation of class.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          method="post"
          className="flex-col flex gap-10 w-full"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-slate-300 text-lg">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name of Classroom"
              className="bg-slate-700 text-white rounded-md px-2 py-1 w-full outline-none"
              value={classroom.name}
              onChange={(e) =>
                setClassroom({ ...classroom, name: e.target.value })
              }
            />
          </div>
          <div>
            <div className="border-b-2 border-b-slate-600 flex items-center gap-2 py-2">
              <h2 className="text-lg">Timings</h2>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setClassroom({
                    ...classroom,
                    dayAndTime: [
                      ...classroom.dayAndTime,
                      { day: "", from: "", to: "" },
                    ],
                  });
                }}
                className="w-fit border-2 rounded-md p-1.5 bg-blue-500 border-blue-500 hover:text-blue-500 hover:bg-transparent"
              >
                <PlusCircle />
              </button>
            </div>
            <div className="flex flex-col gap-6 my-6">
              {classroom.dayAndTime.map((eachDayAndTime, index) => (
                <div id={`day${index + 1}`} className="flex-center gap-4">
                  <div className="flex flex-col">
                    <label htmlFor={`day${index + 1}`}>Day</label>
                    <select
                      name="day"
                      id={`day${index + 1}`}
                      className="bg-black rounded-md border-2 shadow-md shadow-pink-800 border-pink-800 px-1.5 py-2 mb-4 cursor-pointer text-pink-400 outline-none h-fit"
                      value={eachDayAndTime.day}
                      onChange={(e) => {
                        const newDayAndTime = classroom.dayAndTime.map(
                          (each, i) => {
                            if (i === index) {
                              return {
                                ...each,
                                day: e.target.value,
                              };
                            }
                            return each;
                          }
                        );
                        setClassroom({
                          ...classroom,
                          dayAndTime: newDayAndTime,
                        });
                      }}
                    >
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor={`from${index + 1}`}>From</label>
                    <select
                      name="from"
                      id={`from${index + 1}`}
                      className="bg-black rounded-md border-2 shadow-md shadow-pink-800 border-pink-800 px-1.5 py-2 mb-4 cursor-pointer text-pink-400 outline-none h-fit"
                      value={eachDayAndTime.from}
                      onChange={(e) => {
                        const newDayAndTime = classroom.dayAndTime.map(
                          (each, i) => {
                            if (i === index) {
                              return {
                                ...each,
                                from: e.target.value,
                              };
                            }
                            return each;
                          }
                        );
                        setClassroom({
                          ...classroom,
                          dayAndTime: newDayAndTime,
                        });
                      }}
                    >
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option
                          key={`optionFrom${index + 1}`}
                          value={`${i}:00 hrs`}
                        >
                          {i}:00 hrs
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor={`to${index + 1}`}>To</label>
                    <select
                      name="to"
                      id={`to${index + 1}`}
                      className="bg-black rounded-md border-2 shadow-md shadow-pink-800 border-pink-800 px-1.5 py-2 mb-4 cursor-pointer text-pink-400 outline-none h-fit"
                      value={eachDayAndTime.to}
                      onChange={(e) => {
                        const newDayAndTime = classroom.dayAndTime.map(
                          (each, i) => {
                            if (i === index) {
                              return {
                                ...each,
                                to: e.target.value,
                              };
                            }
                            return each;
                          }
                        );
                        setClassroom({
                          ...classroom,
                          dayAndTime: newDayAndTime,
                        });
                      }}
                    >
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option
                          key={`optionTo${index + 1}`}
                          value={`${i}:00 hrs`}
                        >
                          {i}:00 hrs
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setClassroom({
                        ...classroom,
                        dayAndTime: classroom.dayAndTime.filter(
                          (_, i) => i !== index
                        ),
                      });
                    }}
                    className="w-fit border-2 rounded-md p-1.5 bg-red-500 border-red-500 hover:text-red-500 hover:bg-transparent"
                  >
                    <Trash />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="w-fit border-2 rounded-md p-1.5 bg-green-600 border-green-600 hover:text-green-500 hover:bg-transparent"
            >
              Create Classroom
            </button>
          </div>
        </form>
      </div>
    </MainContainer>
  );
};
export default CreateClassroom;
