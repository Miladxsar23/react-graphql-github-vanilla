import React from "react";
import Repository from "../Repository/Repository";
const Organization = ({
  organization,
  errors,
  onFetchMoreIssues,
  onAddStar,
  onRemoveStar,
}) => {
  return (
    <div className="Organization">
      {errors ? (
        <div className="alert alert-danger">
          {errors.map((e) => e.message).join(" ")}
        </div>
      ) : (
        <div className="text-center">
          <Repository
            repository={organization.repository}
            onFetchMoreIssues={onFetchMoreIssues}
            onAddStar={onAddStar}
            onRemoveStar={onRemoveStar}
          />
        </div>
      )}
    </div>
  );
};

export default Organization;
