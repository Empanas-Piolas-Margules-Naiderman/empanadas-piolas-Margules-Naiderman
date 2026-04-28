import { Route, Routes } from "react-router-dom";
import HomePage from "./assets/screens/HomePage";
import LogIn from "./assets/screens/LogIn";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
};

export default App;
