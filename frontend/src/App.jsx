import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
import "./App.css";

// Other Pages
import NonProfitOverall from "#nonprofitPage/NonProfitOverall";
import RefugeeOverall from "#refugeePage/RefugeeOverall";

// Other Components
import SubPageSelect from "#components/SubPageSelect/SubPageSelect";

// Utils
import { createPageNavigator } from "#utils/pathUtils";
import { OverallPages } from "#utils/pathUtils";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const pageNavigator = createPageNavigator(navigate, location);

  function navigateToPage(page) {
    pageNavigator(page);
  }

  function subPageChoose(subPage) {
    if (subPage === OverallPages.NONPROFIT) {
      navigateToPage("/nonprofit");
    } else if (subPage === OverallPages.REFUGEE) {
      navigateToPage("/refugee");
    } else {
      navigateToPage("/");
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<SubPageSelect changePage={subPageChoose} />}
        />
        <Route path="/nonprofit/*" element={<NonProfitOverall />} />
        <Route path="/refugee/*" element={<RefugeeOverall />} />
      </Routes>
    </div>
  );
}

export default App;
