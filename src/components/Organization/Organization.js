import React from "react";
import Repository from "../Repository/Repository";
const Organization = ({ organization, errors, onFetchMoreIssues }) => {
  return (
    <div className="Organization">
      {errors ? (
        <div className="alert alert-danger">
          {errors.map((e) => e.message).join(" ")}
        </div>
      ) : (
        <div className="text-center">
          <strong>issue from Organization:</strong>
          <a href={organization.url}>{organization.name}</a>
          <br />
          <Repository repository={organization.repository} onFetchMoreIssues={onFetchMoreIssues}/>
        </div>
      )}
    </div>
  );
};

export default Organization;
