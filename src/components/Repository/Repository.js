import * as React from "react";
import IssueTable from "../IssueTable/IssueTable";
import StarRepository from "../StarRepository/StarRepository";
const Repository = ({
  repository,
  onFetchMoreIssues,
  onAddStar,
  onRemoveStar,
}) => {
  const { viewerHasStarred, id, stargazers } = repository;
  return (
    <div className="text-center">
      <StarRepository
        repositoryId={id}
        starCount={stargazers.totalCount}
        viewerHasStarred={viewerHasStarred}
        onAddStar={onAddStar}
        onRemoveStar={onRemoveStar}
      />
      <IssueTable issues={repository.issues} />
      {repository.issues.pageInfo.hasNextPage && (
        <button onClick={onFetchMoreIssues} className="btn btn-primary">
          More
        </button>
      )}
    </div>
  );
};

export default Repository;
