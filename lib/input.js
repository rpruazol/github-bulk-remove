'use strict';

const minimist = require('minimist');


class Input {
    constructor() {
        const args = minimist(process.argv.slice(2));
        
        this.token = this.getToken(args.t);
        this.user = args.u;
        this.file = args.f;
    }
    getToken(token = '') {
        return token.length === 40 ? token : undefined;
    }
    userName(name = '') {
        return name ? name : undefined;
    }
    valid() {
        return this.token && this.user && this.file;
    }
}

module.exports = Input;