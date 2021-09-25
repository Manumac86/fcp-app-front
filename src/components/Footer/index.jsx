import React from 'react';
import spotify from '../../assets/icons/spotify.svg';
import instagram from '../../assets/icons/instagram.svg';
import facebook from '../../assets/icons/facebook.svg';
import twitter from '../../assets/icons/twitter.svg';
import youTube from '../../assets/icons/youtube.svg';

const Footer = () => {
  return (
    <div className="Footer">
      <div className="container">
        <div className="Footer_Left">
          <a
            className="vote-button btn btn-primary"
            href="https://drive.google.com/file/d/1Je_pCs2mK-BbTt3VIQ3CRAfGnlMdsl8e/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            <strong>BASES</strong>
          </a>
        </div>
        <div className="Footer_Right">
          <a className="p-2" href="https://www.facebook.com/FCPatagonia1" target="_blank" rel="noreferrer">
            <img src={facebook} alt="" />
          </a>
          <a className="p-2" href="https://www.instagram.com/fcpatagonia/" target="_blank" rel="noreferrer">
            <img src={instagram} alt="" />
          </a>
          <a className="p-2" href="https://fcp.org.ar/" target="_blank" rel="noreferrer">
            <img src={twitter} alt="" />
          </a>
          <a
            className="p-2"
            href="https://open.spotify.com/artist/56YEXfAWtmwV9bTBf5qw1t"
            target="_blank"
            rel="noreferrer"
          >
            <img src={spotify} alt="" />
          </a>
          <a
            className="p-2"
            href="https://www.youtube.com/c/Fundaci%C3%B3nCulturalPatagonia/videos"
            target="_blank"
            rel="noreferrer"
          >
            <img src={youTube} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
