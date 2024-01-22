const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log('Databse connection successful!'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
