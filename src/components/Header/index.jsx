import React from 'react';
import { Container } from 'react-bootstrap';
import Logo from './Logo.jsx';
import searchIcon from '../../assets/searchIcon.svg';
import logoVamosLasBandas from '../../assets/vamosLasBandasLogo.svg';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <div className="Header">
      <div className="Header_Logo_Container">
        <Logo img={logoVamosLasBandas} styleClassName={'fcp'} />
      </div>
      <div className="container Header_Search_Container">
        <div className="input-group Header_Search">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <img src={searchIcon} />
            </span>
          </div>
          <input
            type="search"
            className="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
