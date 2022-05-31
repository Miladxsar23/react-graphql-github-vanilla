import * as React from "react";
import ReactionList from "../ReactionList/ReactionList";
const IssueTable = ({ issues }) => {
  const rows = issues.edges.map(({ node }, idx) => {
    const { id, title, url, author, reactions } = node;
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
        <td className="p-3"><ReactionList reactions={reactions} /></td>
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
