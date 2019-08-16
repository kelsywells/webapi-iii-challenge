// code away!

const express = require('express');
const server = express();
server.use(express.json());
require('dotenv').config();
const port = process.env.PORT || 4000;


console.log(port);


server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
