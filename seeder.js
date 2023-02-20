const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const colors = require('colors');

const Note = require('./model/Note');
const User = require('./model/User');

// Configuring dotenv
dotenv.config({ path: './config/config.env' });

// Connecting to the Database
async function connectDB() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.9wgye.mongodb.net/${process.env.MONGO_DATABASE_NAME}`
    );
    console.log('Got connected'.rainbow);
  } catch (error) {
    console.log(error);
  }
}

const notes = JSON.parse(
  fs.readFileSync(`${__dirname}/data/note.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/user.json`, 'utf-8')
);

// import data
const importData = async () => {
  connectDB();
  try {
    await Note.create(notes);
    await User.create(users);
    console.log('Data inserted'.bgYellow);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// delete data
const deleteData = async () => {
  connectDB();
  try {
    await Note.deleteMany();
    await User.deleteMany();
    console.log('Got deleted'.bgRed);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
