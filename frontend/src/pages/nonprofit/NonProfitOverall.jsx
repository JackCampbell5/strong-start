// Node Module Imports
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";

// Local Imports
import "./NonProfitOverall.css";
// Other pages
import Account from "#nonprofitPage/Account/Account";
import Dashboard from "#nonprofitPage/Dashboard/Dashboard";
import EditService from "#nonprofitPage/EditServicePage/EditServicePage";
import LoginPage from "#nonprofitPage/LoginPage/LoginPage";
import NewService from "#nonprofitPage/NewService/NewService";
import SearchService from "#nonprofitPage/SearchService/SearchService";
import ViewServices from "#nonprofitPage/ViewServices/ViewServices";
import RegisterPage from "#nonprofitPage/RegisterPage/RegisterPage";
//Other Components
import NavNonProfit from "#components/NavNonProfit/NavNonProfit";
import FooterNonProfit from "#components/FooterNonProfit/FooterNonProfit";
// Util Functions
import { NpPages } from "#utils/pathUtils";
import { createPageNavigator } from "#utils/pathUtils";

function NonProfitOverall() {
  // Constant Variables
  const priorPart = "/nonprofit/";
  const navigate = useNavigate();
  const location = useLocation();
  const pageNavigator = createPageNavigator(navigate, location);

  /**
   * Navigate to a new page.
   * @param {string} path - The path to navigate to.
   */
  function nav(path) {
    pageNavigator(priorPart + path);
  }
  return (
    <div className="NonProfitOverall">
      <NavNonProfit onNavigate={nav} />
      <div className="mainContent">
        <Routes>
          <Route path="" element={<Dashboard />} />{" "}
          <Route path={`/${NpPages.DASHBOARD}`} element={<Dashboard />} />
          <Route path={`/${NpPages.EDITSERVICE}`} element={<EditService />} />
          <Route path={`/${NpPages.NEWSERVICE}`} element={<NewService />} />
          <Route
            path={`/${NpPages.SEARCHSERVICE}`}
            element={<SearchService />}
          />
          <Route path={`/${NpPages.VIEWSERVICES}`} element={<ViewServices />} />
          <Route path={`/${NpPages.LOGIN}`} element={<LoginPage />} />
          <Route path={`/${NpPages.REGISTER}`} element={<RegisterPage />} />
        </Routes>
      </div>
      <FooterNonProfit />
    </div>
  );
}

export default NonProfitOverall;
