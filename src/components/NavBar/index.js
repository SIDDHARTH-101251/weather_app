import { Link } from "react-router-dom";
import "./index.css";

const NavBar = () => (
  <nav className="navbar">
    <Link to="/" className="nav-item-container">
      <div>
        <button className="navbar-button">
          <i className="fa-solid fa-house navbar-icon"></i>
        </button>
      </div>
    </Link>
    <Link to="/map" className="nav-item-container">
      <div>
        <button className="navbar-button">
          <i className="fa-solid fa-map-location-dot navbar-icon"></i>
        </button>
      </div>
    </Link>
    <Link to="/chat" className="nav-item-container">
      <div>
        <button className="navbar-button">
          <i className="fa-solid fa-comment navbar-icon"></i>
        </button>
      </div>
    </Link>
  </nav>
);

export default NavBar;
