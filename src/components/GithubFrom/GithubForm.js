import React, { Component } from "react";
import * as api from "../../api";
class GithubForm extends Component {
  state = {
    organization: "the-road-to-learn-react",
    repository: "the-road-to-learn-react",
  };
  handleOrganizationChange = (evt) => {
    const organization = evt.target.value;
    this.setState({
      organization,
    });
  };
  handleRepositoryChange = (evt) => {
    const repository = evt.target.value;
    this.setState({
      repository,
    });
  };
  handleSubmit = (evt) => {
    evt.preventDefault();
    const {organization, repository} = this.state;
    if(organization && repository){
      this.props.onSubmit(organization, repository)
    }else {
      alert("please fill two fields")
    }
  };
  componentDidMount() {
    const {organization, repository} = this.state
    this.props.onSubmit(organization, repository)
  }
  render() {
    const { organization, repository } = this.state;
    return (
      <form
        className="d-flex flex-row justify-content-center align-items-center"
        onSubmit={this.handleSubmit}
      >
        <div className="input-group w-75 m-3">
          <input
            type="text"
            className="form-control"
            value={organization}
            onChange={this.handleOrganizationChange}
            placeholder="organization..."
          />
          <span className="input-group-text">/</span>
          <input
            type="text"
            className="form-control"
            value={repository}
            onChange={this.handleRepositoryChange}
            placeholder="repository..."
          />
          <button type="submit" className="btn btn-primary">
            send
          </button>
        </div>
      </form>
    );
  }
}

export default GithubForm;
