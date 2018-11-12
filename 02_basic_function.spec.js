const {add} = require('./01_basic_module');

const actual = add(5,6);
const expected = 11;

if (actual != expected) {
    throw new Error("The add function did not return 11 when adding 5 and 6");
}

console.log("All tests have passed!");