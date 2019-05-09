import React from "react";

const index = props => {
  return (
    <section class="latest section">
      <div class="section-inner">
        <h2 class="heading">Latest Projects</h2>

        <div class="item row">
          <a
            class="col-md-4 col-12"
            href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/startupkit-bootstrap-theme-for-saas-startups/"
            target="_blank"
          >
            <img
              class="img-fluid project-image"
              src="assets/images/projects/project-3.png"
              alt="project name"
            />
          </a>
          <div class="desc col-md-8 col-12">
            <h3 class="title">
              <a
                href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/startupkit-bootstrap-theme-for-saas-startups/"
                target="_blank"
              >
                Startup Kit - Bootstrap 4 Theme for SaaS Startups
              </a>
            </h3>
            <p class="mb-2">
              You can put one of your secondary projects here. Suspendisse in
              tellus dolor. Vivamus a tortor eu turpis pharetra consequat quis
              non metus. Aliquam
            </p>
            <p>
              <a
                class="more-link"
                href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/startupkit-bootstrap-theme-for-saas-startups/"
                target="_blank"
              >
                <i class="fas fa-external-link-alt" />
                Find out more
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

index.propTypes = {};

export default index;
