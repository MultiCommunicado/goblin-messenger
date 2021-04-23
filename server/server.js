const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html')); 
}); 

app.listen(PORT, () =>{console.log(`Listening at port ${PORT}.`)});