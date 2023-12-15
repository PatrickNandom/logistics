const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database/db')
const cors = require('cors');
const routes = require('./routes');
const app = express();

// dotenv setup
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);




const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
