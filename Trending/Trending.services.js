const listenedController=require("./Trending.controller")




async function addListenedSong(song, userId) {
    try {
        let songExists = await listenedController.readOne(song.video_id);

        if (songExists) {
            // השתמש ב-$inc להגדלת ה-playCount
            return await listenedController.update(song.video_id, { $inc: { playCount: 1 } });
        } else {
            // אם השיר לא קיים, הוסף אותו עם playCount התחלתי של 1
            return await listenedController.create({ ...song, User: userId, playCount: 1 });
        }
    } catch (error) {
        console.error('Error in addListenedSong:', error);
        return { success: false, message: "An error occurred while adding or updating the song", error: error.message };
    }
}




async function gettrendingSongs(userId) {
    return await listenedController.readByUser(userId);
  }



module.exports = {addListenedSong,gettrendingSongs};


