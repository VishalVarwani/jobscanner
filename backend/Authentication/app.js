const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email, password:password})

        
        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})
app.post("/save-job", async (req, res) => {
    const { email, job } = req.body; // Email of the logged-in user and the job to save

    try {
        const user = await collection.findOne({ email: email });
        if (user) {
            // Check if the job is already saved
            const isJobSaved = user.savedJobs.some(savedJob => savedJob.JobLink === job.JobLink);

            if (!isJobSaved) {
                user.savedJobs.push(job);
                await user.save();
                res.json("Job saved successfully");
            } else {
                res.json("Job is already saved");
            }
        } else {
            res.json("User not found");
        }
    } catch (error) {
        console.error(error);
        res.json("Error saving job");
    }
});
app.post("/get-saved-jobs", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await collection.findOne({ email: email });
        if (user) {
            res.json({ savedJobs: user.savedJobs });
        } else {
            res.json({ savedJobs: [] });
        }
    } catch (error) {
        console.error(error);
        res.json({ savedJobs: [] });
    }
});
app.post("/delete-saved-job", async (req, res) => {
    const { email, jobLink } = req.body;
  
    try {
      await collection.updateOne(
        { email: email },
        { $pull: { savedJobs: { JobLink: jobLink } } } // Remove the job from savedJobs array
      );
      res.json("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      res.json("Error deleting job");
    }
  });
  // get user email and pw 
  app.post("/get-user-info", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await collection.findOne({ email: email });
        if (user) {
            res.json({ email: user.email, password: user.password, savedJobs: user.savedJobs });
        } else {
            res.json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.json({ message: "Error fetching user info" });
    }
});



app.listen(8000,()=>{
    console.log("port connected");
})