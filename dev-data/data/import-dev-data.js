const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log('Databse connection successful!'));

const tours = fs.readFileSync(`${__dirname}/tours.json`, 'utf-8');
const users = fs.readFileSync(`${__dirname}/users.json`, 'utf-8');
const reviews = fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8');

const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
    await User.create(JSON.parse(users));
    await Review.create(JSON.parse(reviews));
    console.log('Updated');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
