const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const cors = require('cors'); // Import CORS

const app = express();
app.use(cors()); // Use CORS middleware
app.use(bodyParser.json());

// Define sets of cities for India and Germany
const indianCities = new Set(["mumbai", 'chennai']);
const germanCities = new Set([/* ... cities ... */]);

// Base URLs for India and Germany
const baseUrlIndia = "https://in.indeed.com/jobs";
const baseUrlGermany = "https://de.indeed.com/jobs";

async function fetchJobData(query, location, start) {
    let driver;
    try {
        // Determine the appropriate base URL based on the location
        const baseUrl = indianCities.has(location) ? baseUrlIndia : germanCities.has(location) ? baseUrlGermany : null;
        if (!baseUrl) throw new Error("The location does not match known cities in India or Germany.");

        // Construct the Indeed URL with query and location
        const url = `${baseUrl}?q=${query}&l=${encodeURIComponent(location)}&start=${start}`;

        // Set Chrome options
        const options = new chrome.Options();
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

        await driver.get(url);
        await driver.sleep(5000); // Wait for the page to load

        // List to store extracted job data
        const jobData = [];

        // Locate all job listing elements
        const jobListings = await driver.findElements(By.className('result'));

        // Iterate over each job listing
        for (const job of jobListings) {
            try {
                // Extract job title
                const jobTitle = await job.findElement(By.css('h2.jobTitle')).getText();

                // Extract job link
                const jobLinkElement = await job.findElement(By.css('a'));
                const jobLink = await jobLinkElement.getAttribute('href');

                // Extract company and location information
                const companyLocation = await job.findElement(By.className('company_location'));
                const companyName = await companyLocation.findElement(By.css('span[data-testid="company-name"]')).getText();
                const jobLocation = await companyLocation.findElement(By.css('div[data-testid="text-location"]')).getText();

                // Append the job data to the list
                jobData.push({
                    JobTitle: jobTitle,
                    CompanyName: companyName,
                    JobLocation: jobLocation,
                    JobLink: jobLink
                });
            } catch (e) {
                console.error(`Error extracting job information: ${e.message}`);
            }
        }

        return jobData;
    } catch (error) {
        console.error(`Error fetching job data: ${error.message}`);
        return [];
    } finally {
        if (driver) {
            await driver.quit(); // Close the browser
        }
    }
}

async function saveToMongoDB(jobs) {
    const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017/');
    await client.connect();
    const db = client.db('indeed_job_listings');
    const collection = db.collection('indeed_jobs');
    await collection.deleteMany({}); // Clear previous entries
    if (jobs.length > 0) {
        await collection.insertMany(jobs);
    }
    console.log(`${jobs.length} jobs saved to MongoDB`);
}

app.post('/fetch-jobs', async (req, res) => {
    const { job_title, location } = req.body;
    const allJobs = [];

    try {
        for (let start = 0; start < 50; start += 10) {
            const jobs = await fetchJobData(job_title, location.toLowerCase().trim(), start);
            allJobs.push(...jobs);
        }
        await saveToMongoDB(allJobs);
        res.json({ message: 'Job fetching completed', total_jobs: allJobs.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/jobs', async (req, res) => {
    const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017/');
    await client.connect();
    const db = client.db('indeed_job_listings');
    const collection = db.collection('indeed_jobs');
    const jobs = await collection.find({}, { projection: { _id: 0 } }).toArray(); // Exclude MongoDB's internal _id field
    res.json(jobs);
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});