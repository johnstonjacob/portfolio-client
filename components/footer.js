import '../styles/stylesheet.css';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const Footer = () => (
  <ul className="pure-menu-list footer">
    <li className="pure-menu-item">
      <a href="https://github.com/johnstonjacob" className="pure-menu-link">
        Github
      </a>
    </li>
    <li className="pure-menu-item">
      <a href="https://linkedin.com/in/johnstonajacob" className="pure-menu-link">
        Linkedin
      </a>
    </li>
    <li className="pure-menu-item">
      <a href="mailto:jacob@johnstonjacob.com" className="pure-menu-link">
        Email
      </a>
    </li>
    <li className="pure-menu-item">
      <a href={publicRuntimeConfig.CV_URL} className="pure-menu-link">
        CV
      </a>
    </li>
  </ul>
);

export default Footer;