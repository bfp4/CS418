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
const Topic = require("./TopicsSchema")
const Rating = require("./RatingsSchema")

const app = express();

const port = 5001;

// Middleware

app.use(cors());

app.use(bodyParser.json());

// MongoDB connection URI and client. Change the uri with your own connection string

 const uri = 'mongodb+srv://collin_gebauer:ogd8q1OQBujadpqJ@418lab.pvojs.mongodb.net/UAlbanyReviews';
// const uri = "mongodb+srv://arileverton:uIjhJBm5Jw0Mb9dw@cluster0.xlpup.mongodb.net/"

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
app.post('/addTopic', async (req, res) => {
    const { title, description, category, approved } = req.body;

    try {
        const newTopic = new Topic({ title, description, category, approved });
        await newTopic.save(); // Save using Mongoose
        return res.status(201).json({ message: 'New topic successfully created' });
    } catch (error) {
        console.error('Error inserting topic:', error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
})

app.get('/getUnapprovedTopics', async (req, res) => {
    try {
        const topics = await Topic.find({ approved: false }); // Only find topics with approval set to true
        res.send(topics);
    } catch (error) {
        console.error('Error retrieving topics:', error);
        res.status(500).send(error);
    }
});

app.get('/getApprovedTopics', async (req, res) => {
    try {
        const topics = await Topic.find({ approved: true }); // Only find topics with approval set to true
        res.send(topics);
    } catch (error) {
        console.error('Error retrieving topics:', error);
        res.status(500).send(error);
    }
});

app.get('/getTopic', async (req, res) => {
    const { id } = req.query;
    try {
        const topic = await Topic.findById(id);
        res.send(topic);
    } catch (error) {
        console.error('Error retrieving topics:', error);
        res.status(500).send(error);
    }
});


app.post('/approveTopic', async (req, res) => {
    const { id, approval } = req.body;
    let updatedUserStory;
    try {
        if(approval){
            updatedUserStory = await Topic.findByIdAndUpdate(
                id,
                { approved: approval }
            );
            if (!updatedUserStory) {
                return res.status(404).json({ message: 'Topic not found' });
            }
        } else {
            updatedUserStory = await Topic.findByIdAndDelete(id);
            if (!updatedUserStory) {
                return res.status(404).json({ message: 'Topic not found' });
            }
        }
        res.status(200).json({ message: 'Topic updated successfully', updatedUserStory });
        // const topics = await Topic.find({}, {title:1, description:1, category:1}) // Populate member details
        // res.send(topics);
    } catch (error) {
        console.error('Error retrieving topics:', error);
        res.status(500).send(error);
    }
})

// Create Rating Route
app.post('/createRating', async (req, res) => {
    const { user_id, topic_id, rating, review } = req.body;

    try {
        const newRating = new Rating({ user_id, topic_id, rating, review });
        await newRating.save(); // Save using Mongoose
        return res.status(201).json({ message: 'New rating successfully created' });
    } catch (error) {
        console.error('Error posting review:', error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
})

app.get('/getRatings', async (req, res) => {
    const { id } = req.query;
    try {
        const ratings = await Rating.find({ topic_id: id }); // Only find topics with approval set to true
        res.send(ratings);
    } catch (error) {
        console.error('Error retrieving rating:', error);
        res.status(500).send(error);
    }
});