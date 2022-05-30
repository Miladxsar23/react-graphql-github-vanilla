import * as React from "react";
import IssueTable from "../IssueTable/IssueTable";
const Repository = ({ repository, onFetchMoreIssues }) => {
  return (
    <div className="text-center">
      <strong>In Repository: </strong>
      <a href={repository.url}>{repository.name}</a>
      <IssueTable issues={repository.issues} />
      {repository.issues.pageInfo.hasNextPage && <button onClick={onFetchMoreIssues} className="btn btn-primary">More</button>}
    </div>
  );
};

export default Repository;
