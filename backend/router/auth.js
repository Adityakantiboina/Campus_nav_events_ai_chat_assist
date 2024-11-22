require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../model/userSchema");
const Live = require("../model/liveSchema");
const Upcom = require("../model/upcomSchema");
const Outdated = require("../model/outdatedSchema");
const Event = require("../model/eventSchema");
const Contact = require("../model/contactSchema");

router.post("/login", async (req, res) => {
    try {
      const email = req.body.email;
      const user = await Users.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found!" });
      }
  
      // **Correct usage of bcrypt.compare:**
      const isMatch = (req.body.password===user.password)?true:false;
  
      if (!isMatch) {
        return res.status(401).json({ success: false, message:   
   "Incorrect password!" });
      }
      
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });
  
      res
      .cookie("token", token, {
          httpOnly: true, 
          expires: new Date(Date.now() + 4 * 60 * 60 * 1000),
          secure: process.env.NODE_ENV === "production", 
        })
        .status(200)
        .json({ success: true, message: "Login successful", token });
      
    }  catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
    
    
    
  });
  
  router.get("/Hello",(req,res)=>{
    res.send("Hello");
  })




  router.post("/register", async (req, res) => {
    try {
      const { email, password, name } = req.body;
  
    
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }
  
      const newUser = new Users({
        email,
        password,
        name
      });
  
      await newUser.save();
  
  
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      newUser.tokens.push({ token });
      await newUser.save();
  
      res.status(200).json({
        success: true,
        message: "Successfully created!",
        token,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to create! Try again." });
    }
  });

router.get("/user", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ error: "Authorization token is required" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Users.findById(decoded._id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const userData = {
        name: user.name,
        email: user.email,
      };
  
      res.status(200).json(userData);
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({ error: "Invalid or expired token" });
    }
  });


router.post('/lupload', (req, res) => {

    const {ename, edescription, eimage,etiming,eclub,evenue } = req.body;
    const newEvent = new Event({ ename, edescription, eimage,etiming,eclub,evenue });

    newEvent.save()
        .then(() => res.status(200).json({ message: 'Event saved successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});



router.post('/oupload', (req, res) => {

    const {ename, edescription, eimage ,etiming,eclub,evenue} = req.body;
    const newEvent = new Outdated({ ename, edescription, eimage ,etiming,eclub,evenue});

    newEvent.save()
        .then(() => res.status(200).json({ message: 'Event saved successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});


router.post('/uupload', (req, res) => {

    const {ename, edescription, eimage,etiming,eclub,evenue } = req.body;
    const newEvent = new Upcom({ ename, edescription, eimage,etiming,eclub,evenue });

    newEvent.save()
        .then(() => res.status(200).json({ message: 'Event saved successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});
  

router.get('/events', async (req, res) => {
    try {
        const events = await Live.find(); 
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/live',async(req,res)=>{
  try{
    const events = await Event.find();
    res.json(events);
  }
  catch(error){
    res.status(500).json({error:error.message});
  }
});

router.get('/upcom',async(req,res)=>{
  try{
    const events = await Upcom.find();
    res.json(events);
  }
  catch(error){
    res.status(500).json({error:error.message});
  }
});

router.get('/outdate',async(req,res)=>{
  try{
    const events = await Outdated.find();
    res.json(events);
  }
  catch(error){
    res.status(500).json({error:error.message});
  }
});


router.post('/contact', async (req, res) => {
  try {
    const contactData = new Contact(req.body);
    await contactData.save();

    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({ message: 'Failed to submit contact form', error });
  }
});

  
module.exports=router;
