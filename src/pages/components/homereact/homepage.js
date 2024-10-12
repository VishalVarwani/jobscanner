import React from 'react';
import './homepage.css';
import { Link } from 'react-router-dom';
import banner from "C:/Users/Vishal/Desktop/jobscanner/myapp/src/pages/images/banner.png";
import Search from './Searchbarpage/searchbar';
import News from '../featured/newspage';
import Demo from '../testfolder/test';
import RainbowCursorTrail from '../testfolder/test2';

const Home = () => {
  return (
    <div className="Homepage">
       <div className="Searchbarsection">
        <Search/>
      </div>
      <div className="Banner">
        <h1 className='abouttitle'> Haus is a Los Angeles-based agency that
pushes the boundaries of technology,
strategy, design and content to create lasting
relationships between brands & customers.</h1>
        <Link to="/" className="banner-content">
      
          <span className="banner-text-left typewriter">Tired of jumping between job boards?</span>
          <img className="banner-image" src={banner} alt="Banner" />
          <span className="banner-text-right typewriter">
            We gather listings from all platforms so <br />
            you can find the perfect job all in one place
          </span>
        </Link>
      </div>
     
      <div>
        <News />
      </div>
    </div>
  );
};

export default Home;
