import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "components/layout/Spinner";
import Header from "components/profile/header";
import AboutMe from "components/profile/aboutMe";
import Contact from "components/profile/contact";
import Education from "components/profile/education";
import Experience from "components/profile/experience";
import Skills from "components/profile/skills";
import Github from "components/profile/github";
import Project from "components/profile/project";
import "assets/styles/styles.css";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <div className="profile-container">
          <Header profile={profile} auth={auth} />
          <div class="container sections-wrapper">
            <div class="row">
              <div class="primary col-lg-8 col-12">
                <AboutMe bio={profile.bio} />
                <section class="experience section">
                  <div class="section-inner">
                    <h2 class="heading">Work Experience</h2>
                    <div class="content">
                      {profile.experience.length > 0 ? (
                        profile.experience.map(exp => (
                          <Experience key={exp._id} experience={exp} />
                        ))
                      ) : (
                        <h4>No experience</h4>
                      )}
                    </div>
                  </div>
                </section>

                <section class="latest section">
                  <div class="section-inner">
                    <h2 class="heading">Latest Projects</h2>
                    {profile.project.map(prj => (
                      <Project project={prj} />
                    ))}
                  </div>
                </section>
              </div>
              <div class="secondary col-lg-4 col-12">
                <Contact
                  website={profile.website}
                  location={profile.location}
                  email={profile.user.email}
                />
                <aside class="education aside section">
                  <div class="section-inner">
                    <h2 class="heading">Skills</h2>
                    <p class="skill-list">
                      {profile.skills.length > 0 ? (
                        profile.skills.map(skill => <Skills skill={skill} />)
                      ) : (
                        <h4>No Skills</h4>
                      )}
                    </p>
                  </div>
                </aside>
                <aside class="education aside section">
                  <div class="section-inner">
                    <h2 class="heading">Education</h2>
                    <div class="content">
                      {profile.education.length > 0 ? (
                        profile.education.map(edu => (
                          <Education key={edu._id} education={edu} />
                        ))
                      ) : (
                        <h4>No education</h4>
                      )}
                    </div>
                  </div>
                </aside>
                <aside class="languages aside section">
                  <div class="section-inner">
                    <h2 class="heading">Github</h2>
                    <div class="content">
                      <Github username={profile.githubusername} />
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default Profile;
