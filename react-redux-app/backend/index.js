'use strict';

const express = require('express');
const fs = require('fs');


const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/getStates', (req, res) => {
    let rawdata = fs.readFileSync('data/states.json');
    let stateJSON = JSON.parse(rawdata);

    res.json(stateJSON);
});

app.listen(port, () => console.log(`server started and listening on port ${port}!`));
