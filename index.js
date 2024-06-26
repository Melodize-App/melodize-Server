const express = require('express');
const app = express();
require('dotenv').config();


const db = require("./db");
db.connect();

const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'https://flourishing-dusk-595691.netlify.app'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

const likedRouter = require('./Liked/liked.route');
app.use('/liked', likedRouter);

const topRouter = require('./Top/top.router');
app.use('/top', topRouter);

const craftedRouter = require('./Crafted/Crafted.router');
app.use('/crafted', craftedRouter);

const trendingdRouter = require('./Trending/Trending.router');
app.use('/trending', trendingdRouter);

const userRouter = require('./User/user.router')
app.use("/user", userRouter)


const PORT = process.env.PORT || 2500;
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}!`));
