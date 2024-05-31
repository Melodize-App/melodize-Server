const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fName:{
        type:String,
        required : true
    },
    lName : {
        type:String,
        required:true
    },
    email : {
        type:String,
        unique:true,
        required : true
    },
    password : {
        type:String,
        select: false //מונע החזרת הסיסמה
    },
    permission: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    playlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Liked' 
    }],
    createdDate:
    {
        type:Date,
        default: Date.now// כאן לא להפעיל את הפונקציה, כדי שבכל פעם הוא ייתן את התאריך העדכני
    },
    isActive : {
        type:Boolean,
        default: true
    }
})
const userModel = mongoose.model('user',userSchema)


module.exports = userModel;











