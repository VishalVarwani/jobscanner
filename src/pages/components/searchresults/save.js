import React from 'react';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import "../../../Jobtypes/gridview1.css"
export default function SavedJobs() {
  const location = useLocation();
  const [savedJobs, setSavedJobs] = useState(location.state?.savedJobs || JSON.parse(localStorage.getItem('savedJobs')) || []);
  const handleDeleteJob = (index) => {
    const updatedJobs = savedJobs.filter((_, i) => i !== index); // Remove the job at the specified index
    setSavedJobs(updatedJobs); // Update the state
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs)); // Update localStorage
  };
  return (
    <div className=''>
      <h2 style={{color:"white"}}>Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <p>No saved jobs found.</p>
      ) : (
        <ul>
          {savedJobs.map((job, index) => (
            <li key={index}>
             <div className=''>
       
        <div className='main-content'>
        

         
            <div className='job-grid-header'>
              
              
                  <div
                    key={index}
                    className='job-item'
                  >
                    <div className='job-header'>
                      <h2 style={{ textAlign: 'center' }}>{job.JobTitle}</h2>
                    </div>
                    <p>
                      <strong>Company:</strong> {job.CompanyName}{' '}
                      <strong>Location:</strong> {job.JobLocation}
                    </p>
                    <a
                      href={job.JobLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='apply-link'
                    >
                      Apply now
                    </a>
                   
                    <p>
                      <strong>Source:</strong> {job.Source}
                    </p>
                    <button
                        className='delete-button'
                        onClick={() => handleDeleteJob(index)}
                      >
                        Delete
                      </button>
                  </div>
           
           
            </div>
        
        </div>
      </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
