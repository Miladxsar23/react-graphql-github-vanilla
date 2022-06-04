import * as React from "react";
import ReactionList from "../ReactionList/ReactionList";
const IssueTable = ({ issues, onAddReaction, organizationName, repositoryName }) => {
  const rows = issues.edges.map(({ node }, idx) => {
    const { id, number, title, url, author, reactions, viewerCanReact } = node;
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>
          <img
            src={author && author.avatarUrl}
            className="img-thumbnail rounded-circle"
            alt="author"
            style={{ minWidth: 75, height: 75, objectFit: "cover" }}
          />
        </td>
        <td>{title}</td>
        <td>
          <a href={url}>{url}</a>
        </td>
        <td className="p-3">
          <ReactionList
            organizationName={organizationName}
            repositoryName={repositoryName}
            reactions={reactions}
            issueId={id}
            issueNumber={number}
            onAddReaction={onAddReaction}
            viewerCanReact={viewerCanReact}
          />
        </td>
      </tr>
    );
  });
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>author</th>
          <th scope="col">name</th>
          <th scope="col">address</th>
          <th>Reactions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default IssueTable;
