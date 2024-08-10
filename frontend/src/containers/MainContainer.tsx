import React, { useContext, useLayoutEffect } from "react";
import { CircleCheckBig, CircleX } from "lucide-react";
import { ErrorContext } from "../contexts/ErrorContextProvider";
import { ConfirmationContext } from "../contexts/ConfirmationContextProvider";
import Navbar from "./Navbar";
import Cookies from "js-cookie";

interface mainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: mainContainerProps) => {
  const errorContext = useContext(ErrorContext);
  const { isError, whatIsTheError } = errorContext!;
  const confirmContext = useContext(ConfirmationContext);
  const { isConfirmed } = confirmContext!;

  useLayoutEffect(() => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    if (!(token && userId)) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <section className="bg-slate-900 min-h-screen min-w-screen relative">
      <div className=" flex flex-col gap-24 relative ">
        <Navbar />
        <div className="content w-full h-full mb-10 px-10">{children}</div>
      </div>
      <div
        className={`bg-red-500 rounded-md text-white border-2 border-red-500 w-fit px-2 py-1.5 flex-center gap-1 mt-10 fixed top-[40%] right-0 ${
          isError ? "translate-x-[1%]" : "translate-x-[105%]"
        } transition-transform duration-1000 ease-in-out z-50`}
        style={{ boxShadow: "0px 0px 10px 2px black" }}
      >
        <CircleX />
        <div>{whatIsTheError}</div>
      </div>
      <div
        className={`bg-green-600 rounded-md text-white border-2 border-green-600 w-fit px-2 py-1.5 flex-center gap-1 mt-10 absolute top-[40%] left-0 ${
          isConfirmed ? "-translate-x-[1%]" : "-translate-x-[105%]"
        } transition-transform duration-1000 ease-in-out z-50`}
        style={{ boxShadow: "0px 0px 10px 2px black" }}
      >
        <div>Successful!</div>
        <CircleCheckBig />
      </div>
    </section>
  );
};
export default MainContainer;
