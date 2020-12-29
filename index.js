'use strict';

const Input = require('./lib/input.js');
const remove = require('./lib/remove.js');


const options = new Input();

console.log(options);

options.valid() ? exec(options) : help();


function exec(args) {
    return args.user ? remove(args) : console.error
}


function help() {
    console.log(
        `
        'github-bulk-remove-repo' - Removes all of your repositories based on a text file.

        usage: node index.js [-t <token>] [-u username>] [-f <file>]

        mandatory arguments:

            -t <token>:  your personal access token (PAC) GitHub
            -u <user>:  your GitHub username
            -f <file>:  the name of the text file will be read from
        `
        );
}