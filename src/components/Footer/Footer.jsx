import React from 'react';
import { Link } from 'react-router-dom';
import gitHubIcon from '../../assets/github.svg';
import linkedInIcon from '../../assets/LinkedIn.svg';
import './Footer.css'
export default function Footer() {
  return (
    <div className='footer'>
      <p>© 2024 Supersite, Powered by News API</p>
      <div className='footerLinksSection'>
        <div className='footerLinks'>
          <Link to={'/'}>Home</Link>
          <Link to={'#'}>TripleTen</Link>
        </div>
        <div className='footerIcons'>
          <img src={gitHubIcon} alt='' />
          <img src={linkedInIcon} alt='' />
        </div>
      </div>
    </div>
  );
}
