import React, { useEffect } from "react";

import Spinner from "components/layout/Spinner";
import ProfileItem from "./profileItem";
import PropTypes from "prop-types";

const Profiles = ({ getProfiles, profile: { loading, profiles } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Developers</h1>
          <div className="profile-list">
            {profiles.length > 0
              ? profiles.map(profile => <ProfileItem profile={profile} />)
              : "No profiles found"}
          </div>
        </>
      )}
    </div>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default Profiles;
