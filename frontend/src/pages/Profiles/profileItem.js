import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  },
  classes
}) => {
  return (
    <GridListTile key={_id} className={classes.tile}>
      <img src={avatar} alt={name} style={{ width: 250 }} />
      <GridListTileBar
        title={
          <span>
            {name} : {status}
          </span>
        }
        subtitle={<span>{location}</span>}
        actionIcon={
          <IconButton component={Link} to={`/profile/${_id}`}>
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
    // <div className="profile">
    //   <div className="profile-wrapper">
    //     <img src={avatar} alt="profile" />
    //     <h2>{name}</h2>
    //     <p>
    //       {status} {company && <span> at {company}</span>}
    //     </p>
    //     <p>{location && <span>{location}</span>}</p>
    //     <Link to={`/profile/${_id}`} className="btn btn-primary">
    //       View Profile
    //     </Link>
    //   </div>
    // </div>
  );
};

const styles = theme => ({
  tile: {
    padding: 20
  }
});

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileItem);
