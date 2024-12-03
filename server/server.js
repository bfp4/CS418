// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import { User } from "./UserSchema"
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const User = require("./UserSchema")

const app = express();

const port = 5001;

// Middleware

app.use(cors());

app.use(bodyParser.json());

// MongoDB connection URI and client. Change the uri with your own connection string

const uri = 'mongodb+srv://collin_gebauer:ogd8q1OQBujadpqJ@418lab.pvojs.mongodb.net/UAlbanyReviews';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server only after a successful connection
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });


// Signup Route
app.post('/signup', async (req, res) => {
    const {firstName, lastName, email, username, password, role } = req.body;

    try {
        // Check if username already exists using Mongoose
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Insert a new user
        const newUser = new User({ firstName, lastName, email, username, password, role });
        await newUser.save(); // Save using Mongoose
        return res.status(201).json({ message: 'New user successfully created' });
    } catch (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Login Route
app.get('/login', async (req, res) => {
    console.log(`SERVER: GET USER REQ BODY: ${req.query}`)
    const username = req.query.username
    const password = req.query.password
    try {
        const user = await User.findOne({ username, password })
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
});



// Create Rating Route
app.post('/createRating', async (req, res) => {
    try {
        const rating = new Rating(req.body);
        await project
    }catch (error) {
        res.status(500).json({ error: "Failed to create rating", details: error.message });
    }
    
})

