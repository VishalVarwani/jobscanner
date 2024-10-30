import React, { useState } from 'react';
import "./headerpage.css";
import logo from "../../images/logo.png"
import { useNavigate } from 'react-router-dom';
import saveheader from "../../images/saveheader.png"
import { Link } from 'react-router-dom';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState(JSON.parse(localStorage.getItem('savedJobs')) || []);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleSaveJob = (job) => {
    const updatedSavedJobs = [...savedJobs, job]; // Add the job to the saved jobs array
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs)); // Store in localStorage
  }
  return (
    <div>
      <header>
        <nav>
          <img src={logo} className='logo'/>
          <div className="burger" onClick={toggleMenu}>
            <div className={`line1 ${isOpen ? 'toggle' : ''}`}></div>
            <div className={`line2 ${isOpen ? 'toggle' : ''}`}></div>
            <div className={`line3 ${isOpen ? 'toggle' : ''}`}></div>
          </div>
          <ul className={isOpen ? 'nav-links open' : 'nav-links'}>
            <li>
              <a href="/">Home Page</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li className='accountinfo'>
              <a className='Myprofile' href="#">My Profile</a>
            </li>
            <li>
              <a href="#">Logout</a>
            </li>
            <button style={{background:"none", border:"none"}}
              onClick={() => navigate('/savedjobs', { state: { savedJobs } })} // Navigate to the saved jobs page
            >
                <img  className='saved-jobs-header'src={saveheader} />
            </button>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
