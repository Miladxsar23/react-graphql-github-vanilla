import {
  faThumbsUp,
  faThumbsDown,
  faLaugh,
  faFaceGrinHearts,
  faFlushed, 
  faHeart, 
  faFaceRollingEyes, 
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
function generateFontAwesomeName(githubReactionContent) {
  switch (githubReactionContent) {
    case "THUMBS_UP":
      return {name : faThumbsUp, color : "green"};
    case "THUMBS_DOWN":
      return {name : faThumbsDown, color : "red"};
    case "LAUGH":
      return {name : faLaugh, color : "#ffcc33"};
    case "HOORAY":
      return {name : faFaceGrinHearts, color : "#ffcc33"};
    case "CONFUSED":
      return {name : faFlushed, color : "#ffcc33"};
    case "HEART":
      return {name : faHeart, color : "#900C3F"};
      case "ROCKET":
        return {name : faRocket, color : "#C70039"};
      case "EYES":
        return {name : faFaceRollingEyes, color : "#ffcc33"};
    default:
      return "";
  }
}
const resolveIssueQuery = (queryResult, endCursor) => (state) => {
  const { data, errors } = queryResult.data;
  if (!endCursor) {
    return {
      organization: data.organization,
      fetchErrors: errors,
    };
  }
  const { edges: oldIssues } = state.organization.repository.issues;
  const { edges: newIssues } = data.organization.repository.issues;
  const updatedIssues = [...oldIssues, ...newIssues];
  return {
    organization: {
      ...data.organization,
      repository: {
        ...data.organization.repository,
        issues: {
          ...data.organization.repository.issues,
          edges: updatedIssues,
        },
      },
    },
    fetchErrors: errors,
  };
};


export { generateFontAwesomeName, resolveIssueQuery };
