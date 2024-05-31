const userController=require("./user.controller")
const bcrypt = require('bcryptjs');




async function addUser(newUser) {
    let newUserEmail = newUser.email;
    const filter = { email: newUserEmail };

    let userExists = await userController.readOne(filter);

    if (!userExists) {
        // הצפנת הסיסמה לפני יצירת המשתמש
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword; // עדכון האובייקט newUser עם הסיסמה המוצפנת

        // יצירת המשתמש במסד הנתונים עם הסיסמה המוצפנת
        return await userController.create(newUser);
    } else {
        return { success: false, message: "Item is already in the list" };
    }
}



//update user

// Service
async function updateUser(email, updateData) {
    const filter = { email: email };
    let userExists = await userController.readOne(filter);
  
    if (userExists) {
      return await userController.updateByEmail(filter, updateData);
    } else {
      return { success: false, message: "User not found" };
    }
  }
  







// Gets the user by Email

async function getUserByEmail(email) {
    
    const filter={ email: email }
    let user=await userController.readOne(filter)
    return user;
}



module.exports = {addUser, getUserByEmail,updateUser}
