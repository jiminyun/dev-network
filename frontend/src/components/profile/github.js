import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import profileActions from "reducers/profile/actions";

const Github = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <ul class="list-unstyled">
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map(repo => (
          <li class="item">
            <span class="title">
              <strong>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </strong>
            </span>{" "}
            <br />
            <span class="level">
              {repo.description} <br class="visible-xs" />
            </span>
          </li>
        ))
      )}
    </ul>
  );
};

Github.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

const mapDispatchToProps = dispatch => ({
  getGithubRepos: username => dispatch(profileActions.getGithubRepos(username))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Github);
