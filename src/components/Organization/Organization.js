import React from "react";
import Repository from "../Repository/Repository";
const Organization = ({
  organization,
  organizationName,
  repositoryName,
  errors,
  onFetchMoreIssues,
  onAddStar,
  onRemoveStar,
  onAddReaction
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
            organizationName={organizationName}
            repositoryName={repositoryName}
            repository={organization.repository}
            onFetchMoreIssues={onFetchMoreIssues}
            onAddStar={onAddStar}
            onRemoveStar={onRemoveStar}
            onAddReaction={onAddReaction}
          />
        </div>
      )}
    </div>
  );
};

export default Organization;
