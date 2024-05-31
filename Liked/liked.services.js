const likedController=require("./liked.controller")




async function addLikedSong(song, userId) {
    try {
        let songExists = await likedController.readOne(song.video_id);
        if (songExists) {

            if (!songExists.isLiked) {
                return await likedController.update(song.video_id, { isLiked: true });
            } else {
                // אם השיר כבר מסומן כאהוב, אין צורך לעדכן
                return { success: true, message: "Song is already marked as liked", song: songExists };
            }
        } else {
            // אם השיר לא קיים, הוסף אותו כאהוב
            return await likedController.create({ ...song, User: userId, isLiked: true });

        }
    } catch (error) {
        console.error('Error in addLikedSong:', error);
        return { success: false, message: "An error occurred while adding or updating the song", error: error.message };
    }
}


async function removeLikedSong(song) {
    let songExists = await likedController.readOne(song.video_id);
    if (songExists) {
        return await likedController.update(song.video_id, { isLiked: false }); // צריך להוסיף פרמטרים נכונים
    } else {
        return { success: false, message: "Song not found in the list" };
    }
}




// Gets all liked songs
async function getLiked() {
    
    const filter={isLiked: true}
    let likedSongs=await likedController.read(filter)
    return likedSongs;
}


// async function getLikedByUser(userId) {
//     try {
//         const filter = { User: userId, isLiked: true };
//         let likedSongs = await likedController.read(filter); // השתמש בפונקציה המתאימה מה-controller
//         return likedSongs;
//     } catch (error) {
//         console.error('Error in getLikedByUser:', error);
//         throw error;
//     }
// }


async function getLikedByUser(userId) {
    return await likedController.readByUser(userId);
  }
  


module.exports = {addLikedSong, getLiked, removeLikedSong,getLikedByUser};


