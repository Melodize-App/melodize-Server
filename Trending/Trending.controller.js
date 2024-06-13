const trendingModel = require('./Trending.model'); 

async function readOne(video_id){
    return await trendingModel.findOne({ video_id });
}

async function create(data){
    return await trendingModel.create(data)
}

async function update(video_id, updateData){
    return await trendingModel.findOneAndUpdate({ video_id }, updateData, { new: true });
}

async function readByUser(userId) {
    return await trendingModel.find({ user: userId }).populate('user');
}

module.exports = {create, readOne, update,readByUser } 