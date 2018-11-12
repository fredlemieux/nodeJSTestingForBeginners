const assert = require('assert');
const {add} = require('./01_basic_module');

const actual = add(5,6);
const expected = 11;

assert(actual === expected, "The add function did not return 11 when adding 5 and 6");
// Assert also has plenty of methods for different types of checks:
assert.equal(add(2,3), 5, "The add function did not return 11 when adding 5 and 6");

console.log("Successfully run all tests!!");