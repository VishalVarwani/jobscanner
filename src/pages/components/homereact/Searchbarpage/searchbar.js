import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import './searchbar.css';
import ParticlesComponent from './particles';
export default function Search() {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [position, setPosition] = useState('All Positions'); // Add state for position filter

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_title: jobTitle, location: location, position: position }),
      });
      const data = await response.json();
      if (data.message) {
        console.log(data.message);
        fetchJobs(); // Fetch jobs after posting new search
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api');
      const data = await response.json();
      console.log('Fetched data:', data); // Log the data to see its structure
      if (Array.isArray(data)) {
        // Navigate to results page with job data as state
        navigate('/jobresults', { state: { jobs: data } });
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='ParentHome'>
                <ParticlesComponent/>

      <div className='Searchforjobssection'>
        
          <h2 className="dynamic-typing">You might be one step away from a new opportunity</h2>
          
        <h4 className='searchforjobs'>Search For Jobs</h4>
        <form onSubmit={handleSubmit} className="search-bar">
          <div className="input-group">

            <input
              className="input1"
              type="text"
              placeholder="Search any job title or any keywords"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
            <input
              className="input1"
              type="text"
              placeholder="Enter your desired location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit" className="Searchbutton">Search</button>
          </div>
          <select
            className="Positionsinput"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option>All Positions</option>
            <option>Work Student</option>
            <option>Full-time</option>
            <option>Part-time</option>
          </select>
          <button type="button" className="more-filters">More Filters</button>
        </form>
      </div>
    </div>
  );
}