import axios from "axios";
const BASE_URL = "https://api.github.com/graphql";
const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});
function sendQuery(query, variables = {}) {
  return client.post("", { query, variables });
}

function getOrganization(organization) {
  const query = `query GetOrganization($organization : String!) {
      organization(login : $organization) {
        name
        url
      }
  }`;
  const variables = { organization: organization };
  return sendQuery(query, variables);
}

function getRepository(organization, repository) {
  const query = `
    query GetRepositoryFromOrganization
    ($organization : String!, $repository : String!){
      organization(login : $organization) {
        name
        url
        repository(name : $repository){
          name
          url
        }
      }
    }`;
  const variables = { organization, repository };
  return sendQuery(query, variables);
}

function getIssueFromRepository(organization, repository, endCursor) {
  const query = `
  query GetRepositoryFromOrganization
  ($organization : String!, $repository : String!, $first : Int!, $endCursor : String){
    organization(login : $organization) {
      name
      url
      repository(name : $repository){
        id
        name
        url
        viewerHasStarred
        stargazers {
          totalCount
        }
        issues(first : $first, states : [OPEN], after : $endCursor) {
          edges {
            node {
              id
              title
              url
              state
              author {
                avatarUrl
              }
              reactions(last:3) {
                edges {
                  node {
                    content
                    id
                  }
                }
                totalCount
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }`;
  const variables = { organization, repository, first: 5, endCursor };
  return sendQuery(query, variables);
}

////////////////////////MUTATION/////////////////////////////////////////////////
function addStarToRepository(repositoryId) {
  const query = `
    mutation AddStar($starrableId : ID!) {
      addStar(input:{starrableId : $starrableId}){
        starrable {
          viewerHasStarred
        }
      }
    }
  `;
  const variables = { starrableId: repositoryId };
  return sendQuery(query, variables);
}

function removeStartFromRepository(repositoryId) {
  const query = `
    mutation RemoveStar($starrableId : ID!) {
      removeStar(input:{starrableId : $starrableId}){
        starrable {
          viewerHasStarred
        }
      }
    }
  `;
  const variables = { starrableId: repositoryId };
  return sendQuery(query, variables);
}

export {
  getOrganization,
  getRepository,
  getIssueFromRepository,
  addStarToRepository,
  removeStartFromRepository,
};
