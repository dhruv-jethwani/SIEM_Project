const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require("./models/User.model");

const app = express();

const PORT = 5000;

app.use(cors());    //cors for communicating between React and backend engine
app.use(express.json());    //parses object into plain text

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connection successful.");
})
.catch((error) => {
    console.log("MongoDB connection error:", error);
    process.exit(1);
});

app.post('/api/register', async (req, res) => {
    try{
        const {email, password} = req.body();
        const Userexisting = await User.findOne({email: email});
        if (Userexisting){
            return res.status(400).json({message: "User already exists."});
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                email: email,
                password: hashedPassword
            });
            await newUser.save();
            res.status(201).json({message: "User created successfully"});
        }
    } catch(error) {
        return res.status(500).json({message: "Server error."});
    }
});

app.post('/api/login', async(req, res) => {
    try {
        const {email, password} = req.body();
        const user = await User.findOne({email:email});
        if (!user){
            return res.status(400).json({message:"Invalid credentials"});
        };
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        };
        res.status(200).json({message: "Login Successful"});
    } catch(error) {
        return res.status(500).json({message: "Server error."});
    }
});

app.listen(PORT, () => {
    console.log(`Backend engine is running on: http://localhost:${PORT}`)
})