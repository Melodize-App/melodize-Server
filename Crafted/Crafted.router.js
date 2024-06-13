const express = require('express');
const router = express.Router();
const craftedService=require('./Crafted.services')
const { authenticateToken } = require('../User/auth');


// Add listened song to the list

router.post('/', authenticateToken, async (req, res) => {
    try {
        console.log(req.body);
        const result = await craftedService.addListenedSong(req.body, req.body.userId);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error: error.message });
    }
});


//GET crafted PLAYED SONGS

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(req.params.userId);
        const craftedSongs = await craftedService.getcraftedSongs(userId);
        res.send(craftedSongs);
    } catch (error) {
        res.status(500).send({ message: "error has occurred", error: error.message });
    }
});



module.exports = router;
