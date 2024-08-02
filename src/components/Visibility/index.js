import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Visibility = (props) => {
  let { visibility } = props;
  if (visibility === undefined) {
    visibility = 10000;
  }
  return (
    <div className="visibility-container">
      <i className="fa-solid fa-eye visibility-icon"></i>
      <p className="visibility">Visibility</p>
      <p className="visibility-value">{visibility}m</p>
    </div>
  );
};

Visibility.propTypes = {
  visibility: PropTypes.number.isRequired,
};

export default Visibility;
