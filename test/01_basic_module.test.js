const {add} = require('../01_basic_module');
// #region Using an assertion library 
/* It's great that we can have mocha run our tests, 
but to make our tests more readable and easier to write we should use an assertion library such as Chai, Jasmine, Jest or Unexpected
we'll use Chai */
// #endregion 
const chai = require('chai');
// the three "flavours" of chai:
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;                                       // similar to that packaged with node.js. This assert module, however, provides several additional tests and is browser compatible.

//Try using the .only or .skip methods on the describe function
describe('Array', function() {
  
  // #region The three "flavours" of Chai
  //let's try out our three "flavours", these all result in the same test.
  //which one you use is only a matter of taste,
  //except should will  extends Object.prototype to provide a single getter as the starting point,
  //so if this is likely to cause problems use assert or expect.
  // #endregion 
  describe('#indexOf() using should', function() {
    it('should return -1 when the value is not present', function() {
      [1,2,3].indexOf(4).should.equal(-1);
    });
  });

  describe('#indexOf() using expect', function() {
    it('should return -1 when the value is not present', function() {
      expect([1,2,3].indexOf(4)).equal(-1);
      // methods like .to .be simply make your tests more readable, but are the same as if you omitted them
      expect([1,2,3].indexOf(4)).to.be.equal(-1);
    });
  });

  describe('#indexOf() using assert', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });

});

describe('Functions from the basic module', function () {
  describe('The add function', function () {
    it('should add two numbers correctly', function () {
      assert.equal(add(3,4), 7);
    })
  })
})
