import React from 'react';

const Logo = ({ img, styleClassName }) => {
  return (
    <div className={`Logo ${styleClassName}`}>
      <img alt={`Logo ${styleClassName}`} src={img} />
    </div>
  );
};

export default Logo;
