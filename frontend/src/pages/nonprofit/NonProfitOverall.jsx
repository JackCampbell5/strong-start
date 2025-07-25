// Node Module Imports
import React, { useEffect, useState } from "react";
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
import Recommend from "#nonprofitPage/Recommend/Recommend";
//Other Components
import NavNonProfit from "#components/NavNonProfit/NavNonProfit";
import FooterNonProfit from "#components/FooterNonProfit/FooterNonProfit";
// Util Functions
import { fetchNonProfitInfo } from "#fetch/nonProfitFetchUtils";
import { NpPages } from "#utils/pathUtils";
import { createPageNavigator } from "#utils/pathUtils";
import { getNonProfit } from "#utils/pathUtils";

function NonProfitOverall() {
  // Constant Variables
  const priorPart = "/nonprofit/";
  const navigate = useNavigate();
  const location = useLocation();
  const nonprofit = getNonProfit();
  const pageNavigator = createPageNavigator(navigate, location);
  // State Variables
  const [footerInfo, setFooterInfo] = useState({});

  /**
   * Navigate to a new page.
   * @param {string} path - The path to navigate to.
   */
  function nav(path) {
    pageNavigator(priorPart + path);
  }

  function fetchNonProfitInfoCallback(result) {
    if (result.valid) {
      setFooterInfo(result.data);
    } else {
      setFooterInfo({ error: result.error });
    }
  }

  useEffect(() => {
    // Move to homepage if no stats
    if (!nonprofit) {
      navigate("/");
    } else {
      fetchNonProfitInfo(nonprofit).then(fetchNonProfitInfoCallback);
    }
  }, [nonprofit]);
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
          <Route path={`/${NpPages.RECOMMEND}`} element={<Recommend />} />
        </Routes>
      </div>
      <FooterNonProfit data={footerInfo} />
    </div>
  );
}

export default NonProfitOverall;
