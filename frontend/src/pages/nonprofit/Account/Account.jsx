// Node Module Imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Local Imports
import "./Account.css";
// Other Components
import AccountInfoChange from "#components/AccountInfoCheck/AccountInfoCheck";
import Register from "#components/Register/Register";
import { getNonProfit } from "#utils/pathUtils";
import {
  checkEmployeeLoginStatus,
  editNonprofitEmployee,
} from "#utils/fetch/nonprofitEmployeeFetchUtils";
import AccountInfoCheck from "#components/AccountInfoCheck/AccountInfoCheck";
import { errorReturn, successReturn } from "#utils/httpUtils";
import LoadingButton from "#components/LoadingButton/LoadingButton";

function Account({ nav }) {
  // Constant Variables
  const nonprofit = getNonProfit();
  const [validAccount, setValidAccount] = useState(false);
  // State Variables
  const [userChecked, setUserChecked] = useState(false);
  const [initEmployee, setInitEmployee] = useState({});
  const [errorText, setErrorText] = useState("");

  async function registerFetch(_, accountInfo) {
    // Create the request body with all the params except for the password
    let {
      username: initUsername,
      password: a,
      email: initEmail,
      ...reqBody
    } = initEmployee;
    const startingLength = Object.keys(reqBody).length;

    // Check if any of the params have changed
    if (accountInfo.username && accountInfo.username !== initUsername) {
      reqBody.username = accountInfo.username;
    }
    if (accountInfo.email && accountInfo.email !== initEmail) {
      reqBody.email = accountInfo.email;
    }
    if (accountInfo.password) {
      reqBody.password = accountInfo.password;
    }

    // If no params have changed, return an error
    if (Object.keys(reqBody).length === startingLength) {
      return errorReturn(
        "No changes made to account as no fields were changed"
      );
    }
    return editNonprofitEmployee(nonprofit, reqBody.id, reqBody).then(
      editCallback
    );
  }

  function editCallback(result) {
    if (result.valid) {
      setInitEmployee(result.data);
      return successReturn(result.data.username + "edited successfully");
    } else {
      return result;
    }
  }

  function LoginStatusCallback(result) {
    console.log("LoginStatusCallback", result);
    if (result.valid) {
      const data = result.data;
      setInitEmployee(data);
      setValidAccount(true);
    } else {
      setErrorText(result.error);
    }
  }

  useEffect(() => {
    checkEmployeeLoginStatus(nonprofit).then(LoginStatusCallback);
  }, []);
  return (
    <div className="Account">
      <h1>Account Settings</h1>
      {validAccount ? (
        <div className="validAccount">
          <button onClick={() => setUserChecked((prev) => !prev)}>
            Check Account Info
          </button>
          {userChecked ? (
            <div className="changeAccountInfo">
              <p>Change whatever params you want</p>
              <Register
                setLoggedIn={() => {}}
                nav={nav}
                registerFetch={registerFetch}
                defaults={{
                  username: initEmployee.username,
                  email: initEmployee.email,
                }}
                newAccount={false}
              />
            </div>
          ) : (
            <AccountInfoCheck setUserChecked={setUserChecked} />
          )}
        </div>
      ) : (
        <LoadingButton loading={true} />
      )}
      <p className="errorText">{errorText}</p>
    </div>
  );
}

Account.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default Account;
