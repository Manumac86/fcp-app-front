import React from 'react';
import spotify from '../../assets/spotify.png';
const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer_Left">
        <a
          className="vote-button btn btn-primary"
          href="https://drive.google.com/file/d/1Je_pCs2mK-BbTt3VIQ3CRAfGnlMdsl8e/view?usp=sharing"
          target="_blank"
        >
          <strong>BASES</strong>
        </a>
      </div>
      <div className="Footer_Right">
        <a href="https://www.facebook.com/FCPatagonia1" target="_blank">
          <i class="bi bi-facebook"></i>
        </a>
        <a href="https://www.instagram.com/fcpatagonia/" target="_blank">
          <i class="bi bi-instagram"></i>
        </a>
        <a href="https://fcp.org.ar/" target="_blank">
          <i class="bi bi-globe"></i>
        </a>
        <div className="Footer_Right_Image">
          <a
            href="https://open.spotify.com/artist/56YEXfAWtmwV9bTBf5qw1t"
            target="_blank"
          >
            <img src={spotify} alt="" />
          </a>
        </div>
        <a
          href="https://www.youtube.com/c/Fundaci%C3%B3nCulturalPatagonia/videos"
          target="_blank"
        >
          <i class="bi bi-youtube"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
