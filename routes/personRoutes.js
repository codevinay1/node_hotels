const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

//post route to add a person
router.post("/",async (req,res)=>{
    try{
        const data = req.body
        const newPerson = new Person(data);  
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});

    }
})

//get method to get the person
router.get("/",async(req,res)=>{
    try{
        const data =  await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});

    }

})


router.get("/:workType",async(req,res)=>{
    try{
       const workType = req.params.workType; //extract the worktype from the URL parameter
       if (workType =="chef" || workType =="manager" || workType =="waiter"){
           const response = await Person.find(workType)
           console.log("response fetched");
           res.status(200).json(response);
       }else{
           res.status(404).json({error: "Invalid work type"})
       }
    }catch(err){
       console.log(err);
       res.status(500).json({error: "Internal server error"});
   
    } 
   })

   router.put("/:id",async(req,res)=>{
    try{
        const personId = req.params.id; //extract the id from url paramerter
        const updatedPersonData = req.body;//updated data for the person
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true, //return updated document
            runValidators: true// run mongoose validation
        })
        if(!response){
            return res.status(404).json({error: "person not found"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
   })

   router.delete("/:id", async(req,res)=>{
    try{
        const personId = req.params.id
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: "person not found"});
        }
    }catch(err){
        console.log("data deleted");
        res.status(500).json({error:"Internal server error"});
    }
   })

module.exports = router;