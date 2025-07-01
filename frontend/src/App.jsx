import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router";
import "./App.css";
import NonProfitOverall from "#nonprofitPage/NonProfitOverall";
import RefugeeOverall from "#refugeePage/RefugeeOverall";
import SubPageSelect from "#components/SubPageSelect/SubPageSelect";
// import Footer from "./components/footer/Footer";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  // Set to root on reload (Will change in future just makes data less complicated for now)
  useEffect(() => {
    // navigate("/");
  }, []);
  function subPageSelect1(subPage) {
    if (subPage === "nonprofit") {
      navigate("/nonprofit");
    } else if (subPage === "refugee") {
      navigate("/refugee");
    } else {
      navigate("/");
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<SubPageSelect changePage={subPageSelect1} />}
        />
        <Route path="/nonprofit/*" element={<NonProfitOverall />} />
        <Route path="/refugee/*" element={<RefugeeOverall />} />
      </Routes>
    </div>
  );
}

export default App;
