import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Questionnaire from "./Pages/Questionnaire";
import DoctorSelection from "./Pages/DoctorSelection";
import Consulto from "./Pages/Consulto";
import Doctors from "./Pages/Doctors";
import MyAccount from "./Pages/MyAccount";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questionario" element={<Questionnaire />} />
      <Route path="/selezione-medico" element={<DoctorSelection />} />
      <Route path="/consulto" element={<Consulto />} />
      <Route path="/medici" element={<Doctors />} />
      <Route path="/my-account" element={<MyAccount />} />
    </Routes>
  );
}

export default App;

