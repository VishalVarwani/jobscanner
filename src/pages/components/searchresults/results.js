    import React, { useState, useEffect } from 'react';
    import { useLocation, useNavigate } from 'react-router-dom';
    import './results.css';
    import Searchagain from './searchagain';
    import glogo from "../../images/glogo.png";
    import locationimg from "../../images/location.png";
    import clockimg from "../../images/clock.png";
    import calenderimg from "../../images/calendar.png";
    import save from "../../images/save.png";
    import Alert from '@mui/material/Alert';


import { Link } from 'react-router-dom';

    export default function JobResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState(location.state?.jobs || []);
    const [displayedJobs, setDisplayedJobs] = useState([]);
    const [activePlatform, setActivePlatform] = useState('both');
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const [savedJobs, setSavedJobs] = useState(JSON.parse(localStorage.getItem('savedJobs')) || []); // Initialize with saved jobs from localStorage
    const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility

    useEffect(() => {
        if (jobs.length > 0) {
        setDisplayedJobs(jobs);
        }
    }, [jobs]);

    const handlePlatformSwitch = (platform) => {
        setActivePlatform(platform);
        if (platform === 'indeed') {
        setDisplayedJobs(jobs.filter((job) => job.Source === 'Indeed'));
        } else if (platform === 'linkedin') {
        setDisplayedJobs(jobs.filter((job) => job.Source === 'LinkedIn'));
        } else {
        setDisplayedJobs(jobs); // Show both
        }
    };
    const handleSaveJob = (job) => {
        const updatedSavedJobs = [...savedJobs, job]; // Add the job to the saved jobs array
        setSavedJobs(updatedSavedJobs);
        localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs)); // Store in localStorage
    
        // Show the alert
        setAlertVisible(true);
    
        // Hide the alert after 3 seconds
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
      };
  
    useEffect(() => {
        if (jobs.length === 0) {
        navigate('/');
        }
    }, [jobs, navigate]);

    const toggleDescription = (index) => {
        setExpandedDescriptions((prevState) => ({
        ...prevState,
        [index]: !prevState[index]
        }));
    };

    const truncateDescription = (description = '', isExpanded) => {
        const randomText = 'Here is some additional random information about the job that you might find useful. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Here is some additional random information about the job that you might find useful. Lorem ipsum dolor sit amet, consectetur adipiscing elitHere is some additional random information about the job that you might find useful. Lorem ipsum dolor sit amet, consectetur adipiscing elitHere is some additional random information about the job that you might find useful. Lorem ipsum dolor sit amet, consectetur adipiscing elitHere is some additional random information about the job that you might find useful. Lorem ipsum dolor sit amet, consectetur adipiscing elitHere is some additional random information about the job that you might find useful. Lorem ipsum dolor sit amet, consectetur adipiscing elitHere is some additional random information about the job that you might find useful. Lorem ipsum dolor sit amet, consectetur adipiscing elit';
        if (!isExpanded && description.length > 100) {
        return `${description.slice(0, 100)}...`;
        }
        return isExpanded ? `${description}${randomText}` : description;
    };

    return (
        <div className='JobResults'>
             {alertVisible && (
        <Alert variant="filled" severity="success" style={{ marginBottom: '20px', width:"300px" }}>
          Job has been saved successfully!
        </Alert>
      )}
        <Searchagain />
        <div className='page-container'>
            <div className='sidebar'>
            <h3>Filters</h3>
            <div className='filter-option'>
                <label htmlFor='jobType'>Job Type</label>
                <select id='jobType'>
                <option value=''>All</option>
                <option value='full-time'>Full Time</option>
                <option value='part-time'>Part Time</option>
                <option value='contract'>Contract</option>
                </select>
            </div>
            <div className='filter-option'>
                <label>Location</label>
                <input
                style={{ width: '90%', padding: '8px' }}
                type='text'
                placeholder='Enter your location'
                />
            </div>
            <div className='filter-option'>
                <label htmlFor='companySize'>Company Size</label>
                <select id='companySize'>
                <option value=''>All</option>
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
                </select>
            </div>
            <button className='apply-filters'>Apply Filters</button>
            </div>

            <div className='main-content'>
            <div className='optionbutton'>
                <button
                onClick={() => handlePlatformSwitch('indeed')}
                disabled={jobs.length === 0}
                className={`options  ${activePlatform === 'indeed' ? 'active-button' : ''}`}
                >
                View Indeed
                </button>
                <button
                onClick={() => handlePlatformSwitch('linkedin')}
                disabled={jobs.length === 0}
                className={`options  ${activePlatform === 'linkedin' ? 'active-button' : ''}`}
                >
                View LinkedIn
                </button>
                <button
                onClick={() => handlePlatformSwitch('both')}
                disabled={jobs.length === 0}
                className={`options  ${activePlatform === 'both' ? 'active-button' : ''}`}
                >
                View Both
                </button>
                {/* <button
                className='Backtosearch options'
                onClick={() => navigate('/')}
                >
                Back to Search
                </button> */}
              
            </div>

            {jobs.length === 0 ? (
                <p>No jobs found.</p>
            ) : (
                <div className='job-grid'>
                {displayedJobs.map((job, index) => {
                    const isExpanded = expandedDescriptions[index];
                    return (
                    <div
                        key={index}
                        className={`job-item ${isExpanded ? 'expanded-job' : ''}`} 
                    >
                       <div className='job-header' style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
    <h2 style={{ margin: "0 auto", textAlign: "center" }}>{job.JobTitle}</h2>
    <Link style={{ position: "absolute", right: 20 }}>
        <img
            src={save}
            alt="Save this"
            onClick={() => handleSaveJob(job)} // Save the job when clicking on the save icon
            style={{
                cursor: "pointer",
                paddingLeft: "10px", // Adds space from the job title
            }}
        />
    </Link>
</div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
        <img src={glogo} alt="Company Logo" style={{ marginRight: "10px" }} />
        <p style={{ fontSize: "17px", marginLeft: "5px", color: "whitesmoke" }}>
            {job.CompanyName}
        </p>
    </div>
    
    {/* This is the job source link, it will be pushed to the far right */}
    <Link to={job.Source}className='source' style={{ marginLeft: "auto", color: "white", textDecoration: "none", fontSize: "17px" }}>
        {job.Source}
    </Link>
    <a
                      href={job.JobLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='apply-link'
                    >
                      Apply now
                    </a>
</div>
                            <div style={{ display: "flex", alignItems: "center", gap: "30px", marginLeft:"85px" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img src={locationimg} alt="Location Icon" style={{ marginRight: "5px" }} />
                                <p style={{ fontSize: "17px", margin: "0" }}>
                                {job.JobLocation}
                                </p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <p style={{ fontSize: "17px", margin: "0",  }}>.</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img src={clockimg} alt="Clock Icon" style={{ marginRight: "5px" }} />
                                <p style={{ fontSize: "17px", margin: "0",}}>Fulltime</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <p style={{ fontSize: "17px", margin: "0",  }}>.</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img src={calenderimg} alt="Clock Icon" style={{ marginRight: "5px" }} />
                                <p style={{ fontSize: "17px", margin: "0" }}>30 mins ago</p>
                            </div>
                            
                            </div>
                            <p style={{ display: "flex", alignItems: "center", gap: "30px", marginLeft:"85px", marginTop:"30px" }}>The sun dipped below the horizon, painting the sky in shades of pink and orange. A gentle breeze whispered through the trees, carrying the scent of fresh rain.
                           
                            </p>
                            <Link className=""style={{color:"white", textDecoration:"none", textAlign:"start",marginLeft:"85px", width:"150px", backgroundColor:"transparent", boxShadow:"none", border:"none"}}
                                onClick={() => toggleDescription(index)}
                            >
                                {isExpanded ? 'View Less' : 'View Detail'}
                            </Link>
                        </div>
                       
                        </div>

                       
                        <div className='job-details'>
                      
                            <p style={{  marginLeft:"85px",  }}>{truncateDescription(job.JobDescription || '', isExpanded)}</p>
                          
                        </div>
                    </div>
                    );
                })}
                </div>
            )}
            </div>
        </div>
        </div>
    );
    }
