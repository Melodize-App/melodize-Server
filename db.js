const mongoose = require('mongoose')
const mongoUrl=process.env.mongoURI



function connect() {
try {

    mongoose.connect(mongoUrl)
    .then(() => { console.log("DB connection success") })

}
catch (err) {
    console.log("MongoDB ERROR:", err)
}
}

module.exports = {connect};