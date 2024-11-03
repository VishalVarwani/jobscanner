    const mongoose=require("mongoose")
    mongoose.connect("mongodb://localhost:27017/react_userlogin")
    .then(()=>{
        console.log("mongodb connected");
    })
    .catch(()=>{
        console.log('failed');
    })


    const newSchema=new mongoose.Schema({
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        savedJobs: { type: Array, default: [] } // Array to store saved jobs

    })

    const collection = mongoose.model("collection",newSchema)

    module.exports=collection