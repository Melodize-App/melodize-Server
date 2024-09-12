const userController = require("./user.controller")
const bcrypt = require('bcryptjs');

async function addUser(newUser) {
  let newUserEmail = newUser.email;
  const filter = { email: newUserEmail };

  let userExists = await userController.readOne(filter);

  if (!userExists) {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    return await userController.create(newUser);
  } else {
    return { success: false, message: "Item is already in the list" };
  }
}

async function updateUser(email, updateData) {
  const filter = { email: email };
  let userExists = await userController.readOne(filter);

  if (userExists) {
    return await userController.updateByEmail(filter, updateData);
  } else {
    return { success: false, message: "User not found" };
  }
}

async function getUserByEmail(email) {
  const filter = { email: email }
  let user = await userController.readOne(filter)
  return user;
}

// New function to create a test user
async function createTestUser() {
  console.log('Creating test user...');
  const testUser = {
    fName: "Test",
    lName: "User",
    email: "testuser@example.com",
    password: "testPassword123"
  };

  try {
    const existingUser = await getUserByEmail(testUser.email);
    if (existingUser) {
      console.log('Test user already exists:', existingUser.email);
      return existingUser;
    }

    const newUser = await addUser(testUser);
    console.log('Test user created:', newUser.email);
    return newUser;
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
}

// Function to ensure test user exists
async function ensureTestUser() {
  console.log('Ensuring test user exists...');
  try {
    const testUser = await createTestUser();
    console.log('Test user ensured:', testUser.email);
    return testUser;
  } catch (error) {
    console.error('Failed to ensure test user:', error);
    throw error;
  }
}


//Add user manually:

// function createTestUser() {
//   const testUser = {
//     fName: "Test",
//     lName: "User",
//     email: "testuser@example.com",
//     password: "testPassword123"
//   };

//   return userController.readOne({ email: testUser.email })
//     .then(existingUser => {
//       if (existingUser) {
//         console.log('Test user already exists:', existingUser.email);
//         return existingUser;
//       }
//       return bcrypt.hash(testUser.password, 10)
//         .then(hashedPassword => {
//           testUser.password = hashedPassword;
//           return userController.create(testUser);
//         });
//     })
//     .then(user => {
//       console.log('Test user ensured:', user.email);
//       return user;
//     })
//     .catch(error => {
//       console.error('Error creating test user:', error);
//       throw error;
//     });
// }

// createTestUser();

module.exports = { addUser, getUserByEmail, updateUser, createTestUser, ensureTestUser }