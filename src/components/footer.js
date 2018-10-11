import React from 'react';

const Footer = () => (
  <ul className="pure-menu-list footer">
    <li className="pure-menu-item">
      <a href="https://github.com/johnstonjacob" className="pure-menu-link">
        Github
      </a>
    </li>
    <li className="pure-menu-item">
      <a href="https://linkedin.com/in/johnstonajacob" className="pure-menu-link">
        LinkedIn
      </a>
    </li>
    <li className="pure-menu-item">
      <a href="mailto:jacob@johnstonjacob.com" className="pure-menu-link">
        Email
      </a>
    </li>
    <li className="pure-menu-item">
      <a href={process.env.REACT_APP_CV_URL} className="pure-menu-link">
        CV
      </a>
    </li>
  </ul>
);

export default Footer;
