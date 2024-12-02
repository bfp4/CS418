import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import Project from './ProjectsSchema.js';
import Team from './TeamSchema.js';
import User from './UserSchema.js';
import UserStory from './UserStorySchema.js';
import AssignedStoriesSchema from './AssignedStoriesSchema.js';  // Adjust the path if necessary

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
    const {firstName, lastName, email, userName, password, type } = req.body;

    try {
        // Check if username already exists using Mongoose
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Insert a new user
        const newUser = new User({ firstName, lastName, email, userName, password, type });
        await newUser.save(); // Save using Mongoose
        return res.status(201).json({ message: 'New user successfully created' });
    } catch (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Login Route
app.get('/login', async (req, res) => {
    const { userName, password} = req.query;

    try {
        const user = await User.findOne({ userName, password });
        if (user) {
            return res.status(200).json({ message: 'Login successful!', _id: user._id });
        } else {
            return res.status(401).json({ message: 'Wrong credentials' });
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Create Rating Route
app.post('/createRating', async (req, res) => {
    try {
        const rating = new Rating(req.body);
        await project
    }
})




// Create Project Route
app.post('/createProject', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.send(project);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Create User Story Route
app.post('/createUserStory', async (req, res) => {
    const { user_story, proj_id, priority } = req.body;

    try {
        const projectObjectId = new mongoose.Types.ObjectId(proj_id);

        const project = await Project.findById(projectObjectId);
        if (!project) {
            console.error('Project not found for ID:', projectObjectId);
            return res.status(404).json({ message: 'Project not found' });
        }

        const userStory = new UserStory({
            proj_id: projectObjectId,
            user_story,
            priority,
        });

        const savedUserStory = await userStory.save();
        res.status(201).json({ message: 'User story created successfully', userStory: savedUserStory });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get all user stories for a specific project
app.get('/getUserStories/:projId', async (req, res) => {
    const { projId } = req.params;

    try {
        const userStories = await UserStory.find({ proj_id: projId })
            .populate('proj_id', 'proj_name')  // Populate project info
            .exec();
        res.send(userStories);
    } catch (error) {
        console.error('Error fetching user stories:', error);
        res.status(500).send(error);
    }
});

// Get provided user stories details 
app.get('/getUserStoryDetails', async (req, res) => {
    const { user_story_id } = req.query;
    try {
        const userStory = await UserStory.findById(user_story_id)
            .populate('proj_id'); 

        if (!userStory) return res.status(404).send('User story not found');

        const response = {
            project_name: userStory.proj_id.proj_name, 
            user_story_description: userStory.user_story,
            priority: userStory.priority
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Delete user story 
app.delete('/deleteUserStory/:userStoryId', async (req, res) => {
    const { userStoryId } = req.params;

    try {
        // Find and remove all assignments related to this user story
        await AssignedStoriesSchema.deleteMany({ user_story_id: userStoryId });

        const userStory = await UserStory.findByIdAndDelete(userStoryId);
        if (!userStory) {
            return res.status(404).json({ message: 'User story not found' });
        }

        res.status(200).json({ message: 'User story and related assignments deleted successfully' });
    } catch (error) {
        console.error('Error deleting user story:', error);
        res.status(500).send(error);
    }
});

// Update user story details
app.put('/editUserStory/:userStoryId', async (req, res) => {
    const { userStoryId } = req.params;
    const { user_story, priority } = req.body;

    try {
        const updatedUserStory = await UserStory.findByIdAndUpdate(
            userStoryId,
            { user_story, priority },
            { new: true }
        );
        if (!updatedUserStory) {
            return res.status(404).json({ message: 'User story not found' });
        }
        res.status(200).json({ message: 'User story updated successfully', updatedUserStory });
    } catch (error) {
        console.error('Error updating user story:', error);
        res.status(500).send(error);
    }
});

app.get('/getUnassignedUserStories', async (req, res) => {
    const { user_id } = req.query;  // Expect user_id from query params

    if (!user_id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Fetch the teams the user is part of
        const teams = await Team.find({ member_ids: user_id });

        if (!teams || teams.length === 0) {
            return res.status(404).json({ message: 'No teams found for this user' });
        }

        // Get the project IDs associated with these teams
        const teamIds = teams.map(team => team._id);
        const projects = await Project.find({ team_id: { $in: teamIds } });

        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No projects assigned to your teams' });
        }

        // Fetch unassigned user stories for these projects
        const unassignedUserStories = await UserStory.find({
            proj_id: { $in: projects.map(project => project._id) },
            _id: { $nin: await AssignedStoriesSchema.distinct('user_story_id') }  // Exclude already assigned stories
        })
            .populate('proj_id', 'proj_name');  // Populate project info

        res.status(200).json(unassignedUserStories);
    } catch (error) {
        console.error('Error fetching unassigned user stories:', error);
        res.status(500).send(error);
    }
});

// Assign User Story to Team Member
app.post('/assignUserStory', async (req, res) => {
    const { user_story_id, user_id } = req.body;

    try {
        const userStory = await UserStory.findById(user_story_id);
        if (!userStory) {
            return res.status(404).json({ message: 'User story not found' });
        }

        const existingAssignment = await AssignedStoriesSchema.findOne({ user_story_id, user_id });
        if (existingAssignment) {
            return res.status(400).json({ message: 'User story is already assigned to this user' });
        }

        const assignment = new AssignedStoriesSchema({
            user_story_id: user_story_id,
            user_id: user_id
        });

        await assignment.save();
        res.status(200).json({ message: 'User story assigned successfully' });
    } catch (error) {
        console.error('Error assigning user story:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user stories assigned to a specific user
app.get('/getUserStoriesForUser', async (req, res) => {
    const { user_id } = req.query;

    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch assigned user stories for the user
        const assignedStories = await AssignedStoriesSchema.find({ user_id })
            .populate('user_story_id', 'user_story priority proj_id')
            .populate({
                path: 'user_story_id',
                populate: { path: 'proj_id', select: 'proj_name' }, // Populate project info
            });

        const userStories = assignedStories.map((assignment) => {
            if (assignment.user_story_id) {
                return {
                    _id: assignment.user_story_id._id,
                    user_story: assignment.user_story_id.user_story,
                    priority: assignment.user_story_id.priority,
                    project: assignment.user_story_id.proj_id ? assignment.user_story_id.proj_id.proj_name : 'No Project',
                };
            }
        });

        res.status(200).json(userStories);
    } catch (error) {
        console.error('Error fetching user stories for user:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Create Team Route 
app.post('/createTeam', async (req, res) => {
    const { team_name, member_ids } = req.body;

    try {
        if (member_ids && member_ids.length > 0) {
            const users = await User.find({ '_id': { $in: member_ids } });
            if (users.length !== member_ids.length) {
                return res.status(404).json({ message: 'One or more users not found' });
            }
        }

        const team = new Team({ team_name, member_ids });
        await team.save(); 
        res.status(201).json({ message: 'Team created successfully', team });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Create Team Roster Route
app.post('/createTeamRoster', async (req, res) => {
    const { team_id, member_ids } = req.body;

    try {
        const team = await Team.findById(team_id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const users = await User.find({ '_id': { $in: member_ids } });
        if (users.length !== member_ids.length) {
            return res.status(404).json({ message: 'One or more users not found' });
        }

        const uniqueMembers = new Set([...team.member_ids.map(String), ...member_ids.map(String)]);

        if (uniqueMembers.size === team.member_ids.length) {
            return res.status(400).json({ message: 'No new members to add. All provided members are already in the team.' });
        }

        team.member_ids = Array.from(uniqueMembers);
        await team.save();

        return res.status(200).json({ message: 'Team roster updated successfully', team });
    } catch (error) {
        console.error('Error updating team roster:', error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get Teams
app.get('/getTeams', async (req, res) => {
    try {
        const teams = await Team.find()
            .populate('member_ids', 'f_name l_name'); // Populate member details
        res.send(teams);
    } catch (error) {
        console.error('Error retrieving teams:', error);
        res.status(500).send(error);
    }
});

// Get Teams for a Specific User
app.get('/getTeamsForUser', async (req, res) => {
    const { user_id } = req.query;
    if (!user_id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const teams = await Team.find({ member_ids: user_id }).populate('member_ids', 'f_name l_name');
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error retrieving teams:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get Projects Route
app.get('/getProjects', async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('prod_owner_id', 'f_name l_name')  // Populate owner's first and last name
            .populate('mgr_id', 'f_name l_name')         // Populate manager's first and last name
            .populate('team_id', 'team_name');           // Populate team name

        const responseDetails = projects.map(project => ({
            _id: project._id, 
            proj_name: project.proj_name,
            proj_desc: project.proj_desc,
            prod_owner: project.prod_owner_id ? `${project.prod_owner_id.f_name} ${project.prod_owner_id.l_name}` : 'No Owner',
            manager: project.mgr_id ? `${project.mgr_id.f_name} ${project.mgr_id.l_name}` : 'No Manager',
            team: project.team_id ? project.team_id.team_name : 'No Team'
        }));

        res.send(responseDetails);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send(error);
    }
});

// Get Projects Assigned to User's Teams
app.get('/getProjectsForUser', async (req, res) => {
    const { user_id } = req.query;
    if (!user_id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const teams = await Team.find({ member_ids: user_id });

        if (!teams || teams.length === 0) {
            return res.status(404).json({ message: 'No teams found for this user' });
        }

        const projects = await Project.find({ team_id: { $in: teams.map(team => team._id) } })
            .populate('team_id', 'team_name')
            .populate('prod_owner_id', 'f_name l_name')
            .populate('mgr_id', 'f_name l_name');

        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No projects assigned to your teams' });
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects for user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get Users Route
app.get('/getUsers', async (req, res) => {
    try {
        const userList = await User.find({}, { f_name: 1, l_name: 1 }); 
        res.send(userList);
    } catch (error) {
        res.status(500).send(error);
    }
});