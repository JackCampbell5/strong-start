import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
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

// Utils
import { NpPages } from "#utils/pathUtils";

function NonProfitOverall() {
  const priorPart = "/nonprofit/";
  const navigate = useNavigate();
  function nav(path) {
    navigate(priorPart + path);
  }
  return (
    <div className="NonProfitOverall">
      <NavNonProfit navSet={nav} />
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
