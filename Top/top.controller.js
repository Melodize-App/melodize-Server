const listenedModel = require('./top.model'); 



async function readOne(video_id){
    return await listenedModel.findOne({ video_id });
}

async function create(data){
    return await listenedModel.create(data)
}

async function update(video_id, updateData){
    return await listenedModel.findOneAndUpdate({ video_id }, updateData, { new: true });
}


async function readByUser(userId) {
    return await listenedModel.find({ user: userId }).populate('user');
}

  


module.exports = {create, readOne, update,readByUser } 