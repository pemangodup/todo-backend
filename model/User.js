const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email field is empty.'],
    trim: true,
    unique: [true, 'Email id already exists.'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter correct email format',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password field is empty.'],
    // match: [
    //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$',
    //   'Password format is wrong',
    // ],
  },
});

//Encrypting password using bcrypt
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Comparing password using bcrypt
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Getting JsonWebToken
UserSchema.methods.getJsonWebToken = function () {
  return jwt.sign(
    { id: this._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
    process.env.JWT_SECRET
  );
};

module.exports = mongoose.model('User', UserSchema);
