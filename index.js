require('dotenv').config(); 

const express = require('express');
const morgan = require('morgan');
require('express-async-errors'); 

const app = express();


app.use(express.json());

app.use(morgan('dev'));


const planetsRouter = require('./planetsRouter');
app.use('/api', planetsRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});