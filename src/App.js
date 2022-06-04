import React, { Component } from "react";
import "./App.scss";
import GithubForm from "./components/GithubFrom/GithubForm";
import * as api from "./api";
import Organization from "./components/Organization/Organization";
import {
  resolveIssueQuery,
  resolveAddStarMutation,
  resolveRemoveStarMutation,
  resolveAddReactionMutation,
} from "./helpers";
class App extends Component {
  state = {
    address: { organization: "", repository: "" },
    organization: null,
    fetchErrors: null,
    error: null,
  };
  fetchOrganization = (organization) => {
    api.getOrganization(organization).then((res) => {
      this.setState({
        organization: res.data.data.organization,
        fetchErrors: res.data.errors,
      });
    });
  };
  fetchRepoFromOrganization = (organization, repository) => {
    api.getRepository(organization, repository).then((resp) => {
      this.setState({
        organization: resp.data.data.organization,
        fetchErrors: resp.data.errors,
      });
    });
  };
  fetchIssueFromRepository = (organization, repository, endCursor) => {
    this.setState({
      address: {
        organization,
        repository,
      },
    });
    api
      .getIssueFromRepository(organization, repository, endCursor)
      .then((resp) => {
        this.setState(resolveIssueQuery(resp, endCursor));
      });
  };
  onFetchMoreIssues = () => {
    const { endCursor } = this.state.organization.repository.issues.pageInfo;
    const { organization, repository } = this.state.address;
    this.fetchIssueFromRepository(organization, repository, endCursor);
  };
  onAddStar = (repositoryId) => {
    api.addStarToRepository(repositoryId).then((mutationResult) => {
      this.setState(resolveAddStarMutation(mutationResult));
    });
  };
  onRemoveStar = (repositoryId) => {
    api.removeStartFromRepository(repositoryId).then((mutationResult) => {
      this.setState(resolveRemoveStarMutation(mutationResult));
    });
  };
  onAddReaction = (
    organization,
    repository,
    issueId,
    issueNumber,
    totalCount,
    content
  ) => {
    api
      .addReaction(
        organization,
        repository,
        issueId,
        issueNumber,
        totalCount,
        content
      )
      .then((mutationResult) => {
        this.setState(resolveAddReactionMutation(mutationResult, issueId));
      });
  };
  render() {
    const { error, organization, fetchErrors } = this.state;
    return (
      <div className="App container">
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <GithubForm onSubmit={this.fetchIssueFromRepository} />
        {organization ? (
          <div>
            <div className="Title d-flex justify-content-between p-3 border border-primary">
              <div className="Title-Organization">
                <strong>issue from Organization:</strong>
                <a href={organization.url}>{organization.name}</a>
              </div>
              <div className="Title-Repository">
                <strong>issue from Repository:</strong>
                <a href={organization.repository.url}>
                  {organization.repository.name}
                </a>
              </div>
            </div>
            <Organization
              organization={organization}
              organizationName={this.state.address.organization}
              repositoryName={this.state.address.repository}
              errors={fetchErrors}
              onFetchMoreIssues={this.onFetchMoreIssues}
              onAddStar={this.onAddStar}
              onRemoveStar={this.onRemoveStar}
              onAddReaction={this.onAddReaction}
            />
          </div>
        ) : (
          <p className="text-center">no information yet...</p>
        )}
      </div>
    );
  }
}

export default App;
