import React, { useEffect } from "react";

import Spinner from "components/layout/Spinner";
import ProfileItem from "./profileItem";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const Profiles = ({ getProfiles, profile: { loading, profiles }, classes }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* <h1>People</h1>
          <div className="profile-list">
            {profiles.length > 0
              ? profiles.map(profile => <ProfileItem profile={profile} />)
              : "No profiles found"}
          </div> */}
          <h1>People</h1>
          <div className={classes.root}>
            <GridList cellHeight={180}>
              <GridListTile key="people" cols={4} style={{ height: "auto" }} />
              {profiles.length > 0
                ? profiles.map(profile => <ProfileItem profile={profile} />)
                : "No profiles found"}
            </GridList>
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

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500
    // height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

export default withStyles(styles)(Profiles);
