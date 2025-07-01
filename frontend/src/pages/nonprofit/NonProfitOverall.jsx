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
import Login from "#nonprofitPage/Login/Login";
import NewService from "#nonprofitPage/NewService/NewService";
import SearchService from "#nonprofitPage/SearchService/SearchService";
import ViewServices from "#nonprofitPage/ViewServices/ViewServices";

//Other Components
import NavNonProfit from "#components/NavNonProfit/NavNonProfit";
import FooterNonProfit from "#components/FooterNonProfit/FooterNonProfit";

// Utils
import { NpPages } from "#utils/pathUtils";

function NonProfitOverall({}) {
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
          <Route path="" element={<h3>Non Profit Root Dir Viewer</h3>} />{" "}
          {/* The default path will probably end up as the sign in or dashboard*/}
          <Route path={`/${NpPages.DASHBOARD}`} element={<Dashboard />} />
          <Route path={`/${NpPages.EDITSERVICE}`} element={<Account />} />
          <Route path={`/${NpPages.NEWSERVICE}`} element={<EditService />} />
          <Route path={`/${NpPages.SEARCHSERVICE}`} element={<Login />} />
          <Route path={`/${NpPages.VIEWSERVICES}`} element={<NewService />} />
          <Route path={`/${NpPages.LOGIN}`} element={<SearchService />} />
          <Route path={`/${NpPages.SIGNUP}`} element={<ViewServices />} />
          {/* <Route path="/refugee" element={<RefugeeOverall />} /> */}
        </Routes>
      </div>
      <FooterNonProfit />
    </div>
  );
}

NonProfitOverall.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default NonProfitOverall;
