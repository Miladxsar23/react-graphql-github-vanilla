import * as React from "react";
import { faStar as strokeStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fillStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StartRepository = ({
  repositoryId,
  starCount,
  viewerHasStarred,
  onAddStar,
  onRemoveStar,
}) => {
  const title = viewerHasStarred ? "unstar" : "star";
  const starHandler = viewerHasStarred ? onRemoveStar : onAddStar;
  const starIcon = viewerHasStarred ? fillStar : strokeStar;
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-secondary my-2"
        onClick={() => starHandler(repositoryId)}
      >
        <strong>{title} </strong>
        <FontAwesomeIcon icon={starIcon} />
      </button>
      <button type="button" className="btn btn-warning my-2" disabled={true}>
        {starCount}
      </button>
    </div>
  );
};

export default StartRepository;
