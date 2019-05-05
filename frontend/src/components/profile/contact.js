import React from "react";
import PropTypes from "prop-types";

const Contact = ({ website, location, email }) => {
  return (
    <aside class="info aside section">
      <div class="section-inner">
        <h2 class="heading sr-only">Basic Information</h2>
        <div class="content">
          <ul class="list-unstyled">
            <li>
              <i class="fas fa-map-marker-alt" />
              <span class="sr-only">Location:</span>
              {location}
            </li>
            <li>
              <i class="fas fa-envelope" />
              <span class="sr-only">Email:</span>
              <a href={`mailto=${email}`} target="blank">
                {email}
              </a>
            </li>
            <li>
              <i class="fas fa-link" />
              <span class="sr-only">Website:</span>
              <a href={website} target="blank">
                {website}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

Contact.propTypes = {};

export default Contact;
