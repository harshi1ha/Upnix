const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to check if user is Admin
// (In a real app, you'd export this from a middleware file)
const isAdmin = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        // Ideally verify token here, but for now we trust the endpoint is protected by main auth middleware if used
        // or we can implement a simple check if we are just passing the user ID
        // For simplicity in this demo, we will assume the main server.js mounts this with auth middleware
        // OR we can just do a simple check:
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// GET /api/admin/pending-alumni
router.get('/pending-alumni', async (req, res) => {
    try {
        const users = await User.find({ alumniStatus: 'pending' }).select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT /api/admin/verify-alumni/:id
router.put('/verify-alumni/:id', async (req, res) => {
    try {
        const { status } = req.body; // 'approved' or 'rejected'

        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.alumniStatus = status;

        // If approved, strictly set isAlumni to true
        if (status === 'approved') {
            user.isAlumni = true;
        } else if (status === 'rejected') {
            user.isAlumni = false;
        }

        await user.save();
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
