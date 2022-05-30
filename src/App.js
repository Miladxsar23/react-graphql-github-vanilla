import React, { Component } from "react";
import "./App.scss";
import GithubForm from "./components/GithubFrom/GithubForm";
import * as api from "./api";
import Organization from "./components/Organization/Organization";
import {resolveIssueQuery} from './helpers'
class App extends Component {
  state = {
    address:{organization: "", repository : ""},
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
      address : {
        organization, 
        repository
      }
    })
    api
      .getIssueFromRepository(organization, repository, endCursor)
      .then((resp) => {
        this.setState(resolveIssueQuery(resp, endCursor));
      });
  };
  onFetchMoreIssues = () => {
    const { endCursor } = this.state.organization.repository.issues.pageInfo;
    const {organization, repository} = this.state.address
    this.fetchIssueFromRepository(
      organization,
      repository,
      endCursor
    );
  };
  render() {
    const { error, organization, fetchErrors } = this.state;
    return (
      <div className="App container">
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <GithubForm onSubmit={this.fetchIssueFromRepository} />
        {organization ? (
          <Organization
            organization={organization}
            errors={fetchErrors}
            onFetchMoreIssues={this.onFetchMoreIssues}
          />
        ) : (
          <p className="text-center">no information yet...</p>
        )}
      </div>
    );
  }
}

export default App;
