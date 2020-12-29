'use strict';

const fs = require('fs');
const readline = require('readline');
const superagent = require('superagent');
const Confirm = require('prompt-confirm');
require('dotenv').config();

function remove(opts){
  fs.readFile(opts.file, 'utf8', (err,data) => {
    if(err) console.error(err)
    console.log(
`==========================
REPOSITORIES TO BE DELETED
===========================
`, data
    );
    const prompt = new Confirm('Continue with batch delete?  This CANNOT be undone.')
    
    prompt.run()
      .then(answer => {
        if(answer){
          exec(opts)
        } else{console.log('maybe next time')}
  })
})


function exec(opts){

      const readInterface = readline.createInterface({
          input: fs.createReadStream(opts.file),
          output: false,
          console: false
      });
      
      readInterface.on('line', line => {
        const URL = `https://api.github.com/repos/${line}`;
        superagent
          .del(URL)
          .set('Authorization', `Bearer ${opts.token}`)
          .set('User-Agent', opts.user)
          .then( res => {
            const result = {
              'repo': res.request.url,
              'response': res.headers.status,
            }
            console.log('res', result);
          })
          .catch( error => {
            console.log('error', error.response.error)
          })
      })
    }
}


module.exports = remove;
