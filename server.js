const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('Uncaught exeption! Shutting down..!');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log('Databse connection successful!'));

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection! Shutting down..!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
