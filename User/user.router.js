
const express = require('express');
const router = express.Router();
const userService=require('./user.service');
const auth = require('./auth');
const { authenticateToken } = require('./auth');



// router.get('/', authenticateToken, async (req, res) => {
//     try {
//         const likedSongs = await service.getLiked();
//         res.send({ 
//             message: "added successfully", // הודעה למשתמש
//             songs: likedSongs // שליחת רשימת השירים
//         });
//     } catch (error) {
//         res.status(500).send({ message: "error has occured", error: error.message });
//     }
// });




//get user by email
router.get('/:id',   authenticateToken, async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(404).send(error);
    }
});




//Add new user

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const newUser = await userService.addUser(req.body);
        if (newUser) {
            res.send(newUser);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});





//UPDATE user

router.put('/',  authenticateToken, async (req, res) => {
    try {
        // console.log(req.body);


        const { email, ...updateData } = req.body; // הפרדת האימייל משאר הנתונים לעדכון
        const updatedUser = await userService.updateUser(email, updateData); // שליחת האימייל והנתונים לעדכון ל-service
        if (updatedUser) {
            res.send(updatedUser);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});




router.post('/login', async (req, res) => {
    try {
        // קוראים לפונקציית login מקובץ ה-auth עם נתוני הגוף מהבקשה
        const token = await auth.login(req.body.email, req.body.password);
        // מחזירים את הטוקן בתשובה
        res.json({ token });   
    } catch (error) {
        // במקרה של שגיאה (אימייל לא קיים במערכת, סיסמה שגויה, וכו'), מחזירים 401 Unauthorized
        res.status(401).send({ error: 'Login failed. Check authentication credentials' });
    }
});


module.exports = router;










