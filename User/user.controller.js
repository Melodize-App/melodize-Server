const userModel = require('./user.model')

async function create(data){
    return await userModel.create(data)
}

async function read(filter){
   
   //קוד שנועד לבדיקה בהרצה של סרביס בטרמינל
    let items= await userModel.find(filter)
    console.log(items)
    //קוד סופי
    return await userModel.find(filter)
}

async function readOne(filter){
   return await userModel.findOne(filter)
}

async function updateByEmail(filter, data) {
    return await userModel.findOneAndUpdate(filter, data, { new: true });
}

async function del(id){
    return await userModel.deleteOne({_id:id})
}

module.exports = {create,read,readOne,updateByEmail,del}