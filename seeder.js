const Note = require('./model/Note');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');

// Configuring dotenv
dotenv.config({ path: './config/config.env' });

// Connecting to the Database
mongoose.connect(process.env.MONGO_URI);

const notes = JSON.parse(
  fs.readFileSync(`${__dirname}/data/note.json`, 'utf-8')
);

// import data
const importData = async () => {
  try {
    await Note.create(notes);
    console.log('Data inserted');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// delete data
const deleteData = async () => {
  try {
    await Note.deleteMany();
    console.log('Got deleted');
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[1]) {
  importData();
} else if (process.argv[2]) {
  deleteData();
}
