import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Questionnaire from "./Pages/Questionnaire";
import DoctorSelection from "./Pages/DoctorSelection";
import Consulto from "./Pages/Consulto";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questionario" element={<Questionnaire />} />
      <Route path="/selezione-medico" element={<DoctorSelection />} />
      <Route path="/consulto" element={<Consulto />} />
    </Routes>
  );
}

export default App;
