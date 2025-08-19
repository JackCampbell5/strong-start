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
      if (result.data.length === 0) {
        setSuccessText("No invalid services to edit and then add");
      } else {
        setImportedServices(result.data);
      }
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
      <h1>Import CSV</h1>
      {importedServices.length === 0 ? (
        <div className="fileSelector">
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
          <button onClick={handleSubmit} className="submitButton">
            Submit
          </button>
          <div className="errorText">{errorText}</div>
          <div className="successText">{successText}</div>
        </div>
      ) : (
        <div className="invalidServices">
          <p className="invalidDescription">
            These services had issues adding to the database. Please solve the
            issues listed in red at the top by clicking the right button. If you
            would instead like to delete that service please click the delete
            icon.
          </p>
          <RecList data={importedServices} />
        </div>
      )}
    </div>
  );
}

CsvImport.propTypes = {
  // data: PropTypes.func.isRequired,
};

export default CsvImport;
