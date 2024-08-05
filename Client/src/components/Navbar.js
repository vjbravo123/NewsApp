import React from 'react';
import "../css/navbar.css";
import { Link } from 'react-router-dom';
import logo from './image.png'
const Navbar = ({ setSearchQuery }) => {
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav>
      <div className="clogo">
       <Link to={"/"}>
       <img src={logo} alt="NewsApp" />
       </Link> 
      </div>

      <div className="searchbar">
        <div className="search-container">
          <input type="text" placeholder="Search here" onChange={handleSearch} />
          <i className="fas fa-search"></i>
        </div>
      </div>

      <div className="nav-options">
        <ol>
          <li><Link to={"/home"}>Home</Link></li>
          <li><Link to={"/about"}>About</Link></li>
          <li><Link to={"/contact"}>Contact</Link></li>
        </ol>
      </div>
    </nav>
  );
};
export default Navbar;