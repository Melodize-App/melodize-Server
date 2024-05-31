const mongoose = require('mongoose')
const mongoUrl="mongodb+srv://test:1234@cluster0.onb7tvx.mongodb.net/Refael?retryWrites=true&w=majority"

function connect() {
//נחבר
try {

    mongoose.connect(mongoUrl)
    .then(() => { console.log("DB connection success") })

}
catch (err) {
    console.log("MongoDB ERROR:", err)
}
}

module.exports = {connect};