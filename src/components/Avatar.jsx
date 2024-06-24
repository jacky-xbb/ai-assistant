import React from "react";
import PropTypes from "prop-types";

function Avatar({ src, alt, className }) {
  return <img loading="lazy" src={src} alt={alt} className={className} />;
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Avatar;
