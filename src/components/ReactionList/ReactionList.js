import * as React from "react";
import AddReaction from "../AddReaction/AddReaction";
import ReactionItem from "../ReactionItem/ReactionItem";
const ReactionList = ({
  reactions,
  issueId,
  onAddReaction,
  viewerCanReact,
}) => {
  const { totalCount } = reactions;
  const reactionListEl = reactions.edges.map(({ node }) => {
    const { content, id } = node;
    return (
      <div className="Reaction-item" key={id}>
        <ReactionItem content={content} />
      </div>
    );
  });
  return (
    <div className="d-flex flex-column">
      <div className="Reaction d-flex flex-row justify-content-space-between align-items-center position-relative btn btn-light btn-sm">
        {reactionListEl}
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {totalCount}
          <span className="visually-hidden">unread messages</span>
        </span>
      </div>
      <AddReaction
        issueId={issueId}
        onAddReaction={onAddReaction}
        viewerCanReact={viewerCanReact}
      />
    </div>
  );
};
export default ReactionList;
