import React from 'react';
import Logo from './Logo.jsx';
import searchIcon from '../../assets/searchIcon.svg';
import logoVamosLasBandas from '../../assets/vamosLasBandasLogo.svg';
import logoFCP from '../../assets/FCPLogoBlackLetters.png';

const Header = ({ searchText, onSearch }) => {
  return (
    <div className="Header">
      <div className="Header_Logo_Container">
        <Logo img={logoVamosLasBandas} styleClassName={'fcp'} />
        <Logo img={logoFCP} styleClassName={'fcp'} />
      </div>
      <div className="container Header_Search_Container">
        <div className="input-group Header_Search">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <img alt="search" src={searchIcon} />
            </span>
          </div>
          <input
            type="search"
            className="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => onSearch(e)}
            value={searchText}
          />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
