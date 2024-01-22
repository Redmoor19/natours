const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log('Databse connection successful!'));

const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
    console.log('Updated');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
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
