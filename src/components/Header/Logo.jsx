import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ img, styleClassName }) => {
  return (
    <div className={`Logo ${styleClassName}`}>
      <img src={img} />
    </div>
  );
};

Logo.propTypes = {};

export default Logo;
