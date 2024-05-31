
const likedModel = require('./liked.model');


async function readOne(video_id) {
    return await likedModel.findOne({ video_id });
}

async function create(data) {
    return await likedModel.create(data)
}

async function update(video_id, updateData) {
    return await likedModel.findOneAndUpdate({ video_id }, updateData, { new: true });
}


async function readByUser(userId) {
    return await likedModel.find({ User: userId, isLiked: true }).populate('User');
}


module.exports = { create, readOne, update, readByUser } 