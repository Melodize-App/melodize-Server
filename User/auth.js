// auth.js
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('./user.model');


// This is a function that takes two parameters: 'email' and 'password' to check if the user exists
//and then check if the password is correct, then provide a token for the user


async function login(email, password) {

  // Tries to find a user in the database with the provided email address
  // It selects the 'password' field as well (which is usually not selected by default)
  const user = await User.findOne({ email }).select('+password');

  // If no user is found with the provided email, it logs a message and throws an error
  if (!user) {
    console.log('User not found with email:', email);
    throw new Error('Login failed');
  }

  // This line compares the provided password with the hashed password stored in the database
  const passwordMatch = await bcryptjs.compare(password, user.password);

  // If the passwords don't match, it logs a message and throws an error

  if (!passwordMatch) {
    console.log('Incorrect password for user:', email);
    throw new Error('Login failed');
  } else{
    console.log('Successfully logged in');
  }

  // If the email and password are correct, it creates a JSON Web Token (JWT) with the user's ID
  // The token is signed with a secret code from the env.
  // The token expires in 5 hours
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_CODE, { expiresIn: "30d" });

  // The function returns the generated token
  return token;
}



// This function is used to verify the token provided in the request headers

const authenticateToken = (req, res, next) => {
  // Get the 'authorization' header from the request
  const authHeader = req.headers['authorization'];

  // If the 'authorization' header exists, split it by space and get the second part (which should be the token)
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided, return a 401 Unauthorized status
  if (token == null) return res.sendStatus(401);

  // Verify the token using the secret code from the environment variables
  jwt.verify(token, process.env.SECRET_CODE, (err, user) => {
    // If there's an error verifying the token, log the error and return a 403 Forbidden status
    if (err) {
      console.log('Error verifying token:', err);
      return res.sendStatus(403);
    }

    // If the token is valid, add the user information to the request object
    req.user = user;

    // Call the next middleware function in the chain
    next();
  });
};

module.exports = { login, authenticateToken };




















