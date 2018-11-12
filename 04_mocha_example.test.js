const assert = require('assert');
const {add} = require('./01_basic_module');

describe('Functions from the basic module', function () {
  describe('The add function', function () {
    it('should add two numbers correctly', function () {
      assert.equal(add(3,4), 7);
    })
  })
})

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });

  describe('#indexOf()', function() {
    // pending test below
    it('should return -1 when the value is not present');
  });
});