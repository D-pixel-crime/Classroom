import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import { ErrorContextProvider } from "./contexts/ErrorContextProvider";
import { ConfirmationContextProvider } from "./contexts/ConfirmationContextProvider";

function App() {
  return (
    <ConfirmationContextProvider>
      <ErrorContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ErrorContextProvider>
    </ConfirmationContextProvider>
  );
}

export default App;
