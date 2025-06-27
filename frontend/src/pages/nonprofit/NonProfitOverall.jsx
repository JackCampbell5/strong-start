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

function NonProfitOverall({}) {
  const priorPart = "/nonprofit/";
  const navigate = useNavigate();
  return (
    <div className="NonProfitOverall">
      <NavNonProfit />
      <h3>NonProfitOverall</h3>
      {/* Navigation. Will be moved to nav bar eventually */}
      <button onClick={() => navigate(priorPart)}>Non Profit Root Dir</button>
      <button onClick={() => navigate(`${priorPart}account`)}>Account</button>
      <button onClick={() => navigate(`${priorPart}dashboard`)}>
        Dashboard
      </button>
      <button onClick={() => navigate(`${priorPart}editservice`)}>
        EditService
      </button>
      <button onClick={() => navigate(`${priorPart}login`)}>Login</button>
      <button onClick={() => navigate(`${priorPart}newservice`)}>
        NewService
      </button>
      <button onClick={() => navigate(`${priorPart}searchservice`)}>
        SearchService
      </button>
      <button onClick={() => navigate(`${priorPart}viewservices`)}>
        ViewServices
      </button>
      <Routes>
        <Route path="" element={<h3>Non Profit Root Dir Viewer</h3>} />{" "}
        {/* The default path will probably end up as the sign in or dashboard*/}
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editservice" element={<EditService />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newservice" element={<NewService />} />
        <Route path="/searchservice" element={<SearchService />} />
        <Route path="/viewservices" element={<ViewServices />} />
        {/* <Route path="/refugee" element={<RefugeeOverall />} /> */}
      </Routes>
      <FooterNonProfit />
    </div>
  );
}

NonProfitOverall.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default NonProfitOverall;
