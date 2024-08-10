import { useEffect } from "react";
import MainContainer from "../containers/MainContainer";

const NotFound = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }, []);

  return (
    <MainContainer>
      <div className="text-red-500 text-center">
        PAGE NOT FOUND! Redirecting...
      </div>
    </MainContainer>
  );
};
export default NotFound;
