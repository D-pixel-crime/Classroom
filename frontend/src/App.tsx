import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import { ErrorContextProvider } from "./contexts/ErrorContextProvider";
import { ConfirmationContextProvider } from "./contexts/ConfirmationContextProvider";
import AddTeacher from "./routes/AddTeacher";
import AddStudent from "./routes/AddStudent";
import CreateClassroom from "./routes/CreateClassroom";
import NotFound from "./routes/NotFound";
import Classroom from "./routes/Classroom";

function App() {
  return (
    <ConfirmationContextProvider>
      <ErrorContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-teacher/:adminId" element={<AddTeacher />} />
            <Route path="/add-student/:userId" element={<AddStudent />} />
            <Route
              path="/create-classroom/:adminId"
              element={<CreateClassroom />}
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/classroom/:userId/:classId" element={<Classroom />} />
          </Routes>
        </BrowserRouter>
      </ErrorContextProvider>
    </ConfirmationContextProvider>
  );
}

export default App;
