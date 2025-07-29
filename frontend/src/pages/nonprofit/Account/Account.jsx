// Node Module Imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Local Imports
import "./Account.css";
// Other Components
import AccountInfoChange from "#components/AccountInfoCheck/AccountInfoCheck";
import EditAccount from "#components/EditAccount/EditAccount";
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
  const [userChecked, setUserChecked] = useState(true);
  const [initEmployee, setInitEmployee] = useState({});
  const [errorText, setErrorText] = useState("");

  /**
   * Checks the account info entered to make sure it is differnt from the current account info and that it is valid.
   * Then it calls the edit account fetch function and returns the result of the callback function.
   * @param {any} _ - Unused import
   * @param {object} accountInfo - The account information provided by th edit account component
   * @returns Result object with valid boolean and data object if valid and error string if not
   */
  async function editAccountFetch(_, accountInfo) {
    // Checks what params have been changed and adds them to the request body
    let reqBody = createRecBody(reqBody, accountInfo);
    if (reqBody.valid) {
      reqBody = reqBody.data;
    } else {
      return reqBody;
    }

    // Call the edit account fetch function
    const editResult = editNonprofitEmployee(
      nonprofit,
      reqBody.id,
      reqBody
    ).then(editCallback);
    return editResult;
  }

  /**
   * Checks what params have been changed and adds them to the request body
   * @param {object} accountInfo - The new account information provided by the user
   * @returns Result object with valid boolean and data object if valid new information and error string if not
   */
  function createRecBody(accountInfo) {
    // Create the request body with all the params except for the username, password, and email
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

    return successReturn(reqBody);
  }

  /**
   * Callback function for the edit account fetch function.
   * If the result is valid, it sets the init employee to the new employee and returns a success message. If not, it returns the error message.
   * @param {object} result - Result object with valid boolean and data object if valid and error string if not
   * @returns Result object with valid boolean and success string if valid and error string if not
   */
  function editCallback(result) {
    if (result.valid) {
      setInitEmployee(result.data);
      return successReturn(result.data.username + " edited successfully");
    } else {
      return result;
    }
  }

  /**
   * Callback function for the check employee login status function.
   * @param {object} result - Result object with valid boolean and data object containing current users information if valid and error string if not
   */
  function LoginStatusCallback(result) {
    if (result.valid) {
      const data = result.data;
      setInitEmployee(data);
      setValidAccount(true);
    } else {
      setErrorText(result.error);
    }
  }

  useEffect(() => {
    // On Load check to make sure an employee is logged in and get their information
    checkEmployeeLoginStatus(nonprofit).then(LoginStatusCallback);
  }, []);
  return (
    <div className="Account">
      <h1>Account Settings</h1>
      {validAccount ? (
        <div className="validAccount">
          {userChecked ? (
            <div className="changeAccountInfo">
              <p>Change whatever params you want</p>
              <EditAccount
                setLoggedIn={() => {}}
                nav={nav}
                editAccountFetch={editAccountFetch}
                defaults={{
                  username: initEmployee.username,
                  email: initEmployee.email,
                }}
                newAccount={false}
              />
            </div>
          ) : null}
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
