const express = require('express');
const app = express();
require('dotenv').config();


const db = require("./db");
db.connect();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const likedRouter = require('./Liked/liked.route');
app.use('/liked', likedRouter);

const topRouter = require('./Top/top.router');
app.use('/top', topRouter);

const userRouter = require('./User/user.router')
app.use("/user", userRouter)


const PORT = process.env.PORT || 2500;
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}!`));
