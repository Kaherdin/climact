import React from "react";

const SocialList = ({
  email,
  website_link,
  twitter,
  linkedin,
  size = "md",
}) => {
  return (
    <div>
      {email && (
        <a target="_blank" href={`mailto:${email}`} rel="noreferrer">
          <button
            type="button"
            className={`btn-icon-only btn-simple btn btn-${size} p-0`}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Mail me!"
          >
            <span className="btn-inner--icon">
              <i className="fa fa-envelope"></i>
            </span>
          </button>
        </a>
      )}
      {website_link && (
        <a target="_blank" href={`${website_link}`} rel="noreferrer">
          <button
            type="button"
            className={`btn-icon-only btn-simple btn btn-${size} text-primary`}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Visit me!"
          >
            <span className="btn-inner--icon">
              <i className="fa fa-address-book"></i>
            </span>
          </button>
        </a>
      )}

      {twitter && (
        <a target="_blank" href={`${twitter}`} rel="noreferrer">
          <button
            type="button"
            className={`btn-icon-only btn-simple btn btn-${size} btn-twitter`}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Follow me!"
          >
            <span className="btn-inner--icon">
              <i className="fab fa-twitter"></i>
            </span>
          </button>
        </a>
      )}

      {linkedin && (
        <a target="_blank" href={`${linkedin}`} rel="noreferrer">
          <button
            type="button"
            className={`btn-icon-only btn-simple btn btn-${size} btn-linkedin`}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Link me!"
          >
            <span className="btn-inner--icon">
              <i className="fab fa-linkedin"></i>
            </span>
          </button>
        </a>
      )}
    </div>
  );
};

export default SocialList;
