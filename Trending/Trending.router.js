const express = require('express');
const router = express.Router();
const trendingService=require('./Trending.services')
const { authenticateToken } = require('../User/auth');


// Add listened song to the list

router.post('/', authenticateToken, async (req, res) => {
    try {
        console.log(req.body);
        const result = await trendingService.addListenedSong(req.body, req.body.userId);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error: error.message });
    }
});


//GET trending PLAYED SONGS

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(req.params.userId);
        const trendingSongs = await trendingService.gettrendingSongs(userId);
        res.send(trendingSongs);
    } catch (error) {
        res.status(500).send({ message: "error has occurred", error: error.message });
    }
});



module.exports = router;
