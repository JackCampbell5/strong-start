import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./CsvImport.css";
import { uploadCsvServices } from "#utils/fetch/serviceFetchUtils";
import { getNonProfit } from "#utils/pathUtils";
import RecList from "#components/RecList/RecList";

function CsvImport({}) {
  const nonprofit = getNonProfit();
  const [fileInput, setFileInput] = useState(null);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [importedServices, setImportedServices] = useState([]);
  const handleChange = (event) => {
    setFileInput(event.target.files[0]);
  };

  function uploadCsvCallback(result) {
    setErrorText("");
    setSuccessText("");
    if (result.valid) {
      setImportedServices(result.data);
    } else {
      setErrorText(result.error);
    }
  }
  function handleSubmit() {
    const formData = new FormData();
    formData.append("file", fileInput);
    uploadCsvServices(formData, nonprofit).then(uploadCsvCallback);
  }
  return (
    <div className="CsvImport">
      <h3>CsvImport</h3>
      <div>
        <input
          type="file"
          name="file"
          icon="file text outline"
          iconPosition="left"
          label="Upload CSV"
          labelPosition="right"
          placeholder="UploadCSV..."
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit} className="submitButton">
        Submit
      </button>
      <div className="errorText">{errorText}</div>
      <div className="successText">{successText}</div>
      {importedServices && importedServices.length !== 0 && (
        <RecList data={importedServices} />
      )}
    </div>
  );
}

CsvImport.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default CsvImport;
