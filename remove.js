'use strict';

const fs = require('fs');
const readline = require('readline');
const superagent = require('superagent');
require('dotenv').config();


const readInterface = readline.createInterface({
    input: fs.createReadStream('test.txt'),
    output: false,
    console: false
});

readInterface.on('line', line => {
  const URL = `https://api.github.com/repos/${line}`;
  console.log('NEW LOOP IN THE FOREACH');
  superagent
    .del(URL)
    .set('Authorization', `Bearer ${process.env.TOKEN}`)
    .set('User-Agent', process.env.GITHUB_USER)
    .then( res => {
      console.log('res', res);
    })
    .catch( error => {
      console.log('error', error.response.error)
    })
})




