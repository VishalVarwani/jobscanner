import React from 'react';
import "./headerpage.css";

const Header = () => {
  return (
    <div>
      <header>
        <nav>
          <h1 className='logo'>Job Scanner</h1>
          <ul>
            <li>
              <a href="#">Home Page</a>
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
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
