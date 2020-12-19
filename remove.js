'use strict';

const fs = require('fs');
const readline = require('readline');
const superagent = require('superagent');
// function readFile(path: string | number | Buffer | URL, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void (+3 overloads)
// namespace readFile


fs.readFile('test.txt', 'utf-8', (error, data) => {
  if(error) {
    console.log(error);
  }
  else {
    let newData = [data];
    newData.forEach(line => {
      const URL = `https://api.github.com/repos/${line}`;
      console.log(URL);
      superagent
        .del(URL)
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .set('User-Agent', process.env.GITHUB_USER)
        .then( res => {
          console.log(res);
        })
        .catch( error => {
          console.log('error', error.response.error)
        })

    });
  }
})


