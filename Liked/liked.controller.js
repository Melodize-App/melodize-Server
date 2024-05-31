
const likedModel = require('./liked.model'); // ייבוא המודל


// async function read(filter){
   
//     return await likedModel.find(filter)
// }

// async function read(filter){
   
//     return await likedModel.find(filter).populate('User');
// }

async function readOne(video_id){
    return await likedModel.findOne({ video_id });
}







// async function create(data) {
//     try {
//         let newSong = await likedModel.create(data);
//         console.log('New song added:', newSong);
//         return newSong;
//     } catch (error) {
//         console.error('Error in create:', error);
//         return null;
//     }
// }


async function create(data){
    return await likedModel.create(data)
}

async function update(video_id, updateData){
    return await likedModel.findOneAndUpdate({ video_id }, updateData, { new: true });
}





async function readByUser(userId) {
    return await likedModel.find({ User: userId, isLiked: true }).populate('User');
  }
  


module.exports = {create, readOne, update,readByUser } 