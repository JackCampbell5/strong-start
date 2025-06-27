import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router";
import reactLogo from "./assets/react.svg";
import "./App.css";
import NonProfitOverall from "#nonprofitPage/NonProfitOverall";
import RefugeeOverall from "#refugeePage/RefugeeOverall";
// import Footer from "./components/footer/Footer";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  // Set to root on reload (Will change in future just makes data less complicated for now)
  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <div className="App">
      <h1>Strong Start</h1>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/nonprofit")}>Nonprofit</button>
      <button onClick={() => navigate("/refugee")}>Refugee</button>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/nonprofit/*" element={<NonProfitOverall />} />
        <Route path="/refugee/*" element={<RefugeeOverall />} />
      </Routes>
    </div>
  );
}

export default App;
