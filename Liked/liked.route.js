const express = require('express');
const router = express.Router();
const { addLikedSong, removeLikedSong } = require('./liked.services'); 
const service=require('./liked.services');
const { authenticateToken } = require('../User/auth');

// Get liked songs list
router.get('/', authenticateToken, async (req, res) => {
    try {
        const likedSongs = await service.getLiked(); 
        res.send({ 
            message: "added successfully", 
            songs: likedSongs 
        });
    } catch (error) {
        res.status(500).send({ message: "error has occured", error: error.message });
    }
});


// Add liked song to the list
router.post('/', authenticateToken, async (req, res) => {
    try {
        console.log(req.body);
        const result = await addLikedSong(req.body, req.body.userId);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error: error.message });
    }
});

// remove liked song from the list
router.put('/', authenticateToken, async (req, res) => {
    try {
        console.log(req.body);
        const result = await removeLikedSong(req.body); // הוסף await כאן
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error: error.message });
    }
});


router.get('/:userId', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const likedSongs = await service.getLikedByUser(userId);
        res.send(likedSongs);
    } catch (error) {
        res.status(500).send({ message: "error has occurred", error: error.message });
    }
});

module.exports = router;
