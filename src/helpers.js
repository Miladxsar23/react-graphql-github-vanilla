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
      return { name: faThumbsUp, color: "green" };
    case "THUMBS_DOWN":
      return { name: faThumbsDown, color: "red" };
    case "LAUGH":
      return { name: faLaugh, color: "#ffcc33" };
    case "HOORAY":
      return { name: faFaceGrinHearts, color: "#ffcc33" };
    case "CONFUSED":
      return { name: faFlushed, color: "#ffcc33" };
    case "HEART":
      return { name: faHeart, color: "#900C3F" };
    case "ROCKET":
      return { name: faRocket, color: "#C70039" };
    case "EYES":
      return { name: faFaceRollingEyes, color: "#ffcc33" };
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

const resolveAddStarMutation = (mutationResult) => (state) => {
  const { viewerHasStarred } = mutationResult.data.data.addStar.starrable;
  const { totalCount } = state.organization.repository.stargazers;
  return {
    ...state,
    organization: {
      ...state.organization,
      repository: {
        ...state.organization.repository,
        viewerHasStarred: viewerHasStarred,
        stargazers: {
          totalCount: totalCount + 1,
        },
      },
    },
  };
};
const resolveRemoveStarMutation = (mutationResult) => (state) => {
  const { viewerHasStarred } = mutationResult.data.data.removeStar.starrable;
  const { totalCount } = state.organization.repository.stargazers;
  return {
    ...state,
    organization: {
      ...state.organization,
      repository: {
        ...state.organization.repository,
        viewerHasStarred: viewerHasStarred,
        stargazers: {
          totalCount: totalCount - 1,
        },
      },
    },
  };
};

const resolveAddReactionMutation = (mutationResult, issueId) => (state) => {
  if (!mutationResult) {
    alert("you reaction before");
    return state
  }
  const { id, content } = mutationResult.data.data.addReaction.reaction;
  const newReaction = { node: { id, content } };
  const { edges: oldEdges } = state.organization.repository.issues;
  const updatedEdges = oldEdges.map(({ node }) => {
    if (node.id !== issueId) return { node };
    const newReactions = [newReaction, ...node.reactions.edges];
    return {
      node: {
        ...node,
        reactions: {
          ...node.reactions,
          edges: newReactions,
          totalCount: node.reactions.totalCount + 1,
        },
      },
    };
  });
  return {
    ...state,
    organization: {
      ...state.organization,
      repository: {
        ...state.organization.repository,
        issues: {
          ...state.organization.repository.issues,
          edges: updatedEdges,
        },
      },
    },
  };
};

export {
  generateFontAwesomeName,
  resolveIssueQuery,
  resolveAddStarMutation,
  resolveRemoveStarMutation,
  resolveAddReactionMutation,
};
