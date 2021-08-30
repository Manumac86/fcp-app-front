import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import Logo from './Logo';
import LogoFCP from '../../assets/FCPLogo.svg';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <div className="Header">
      <Logo img={LogoFCP} styleClassName={'fcp'} />
      <Jumbotron fluid>
        <Container>
          <h1>Logo</h1>
          <p>Concurso de bandas</p>
        </Container>
      </Jumbotron>
      <input
        className="Header_Search"
        type="text"
        placeholder="Buscar..."
      ></input>
    </div>
  );
};

Header.propTypes = {};

export default Header;
