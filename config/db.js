const mongoose = require('mongoose');

const database = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.9wgye.mongodb.net/${process.env.MONGO_DATABASE_NAME}`
    );
    console.log(`Connecting to the database ${conn}`);
  } catch (error) {
    console.log(` THis is an error: ${error}`);
  }
};
module.exports = database;
