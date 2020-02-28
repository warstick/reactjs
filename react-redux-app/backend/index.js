'use strict';

const express = require('express');
var cors = require('cors')
const fs = require('fs');

const rawdata = fs.readFileSync('data/states.json');
const cities = JSON.parse(rawdata).data;
const app = express()
const port = 8000;

app.use(cors()); // for cross browser

app.get('/', (req, res) => res.send('Server is Up!'));

app.get('/getStates/:state', (req, res) => {
    const {state} = req.params;

    // find state by region
    const foundCity = cities.filter(({state: _state}) => _state === state);

    if (foundCity.length) {
        res.status(200).json({data: foundCity});
    }
    else {
        res.status(404).send('state not found..!!');
    }
});

app.listen(port, () => console.log(`server started and listening on port ${port}!`));
