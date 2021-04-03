"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
function main(args) {
    let name = args.name || 'world';
    let greeting = 'Hi ' + name + '!';
    console.log(greeting);
    return { body: greeting };
}
exports.main = main;
