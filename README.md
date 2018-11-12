## Basic Javascript testing using MochaJS and Chai
---


#### Introduction:
This GIT repo is intended to accopany the presentation by myself (Frederique Lemieux) @ NodeJS Edinburgh Meetup (13/11/2018).  Over the course of 30 minutes, I intend on covering a basic overview of testing in Javascript.  

To properly appreciate what Mocha and Chai do we will work up to automated tests by:  
- starting with an examples of manual testing;
- then we will create our own tests using basic javascript;
- introduce the NodeJS 'assert' module;
- leverage mocha for sycronous testing;
- we'll go though some really useful features in Mocha that even regular users might not be aware of;
- then finally we'll introduce chai, and provide examples of the three flavours; and finally we'll discuss different types of testing.

So why test our code? Well, to make sure everything works as we expect of course!  But why write automated tests when you can just manually test your code as you go.  Manually testing your code is fine, it tells you that code is working at that point in time.  But how can you be sure that your code is still working as expected when
- refactoring, or 
- when your software grows in size and complexity, or 
- what if someone has been writing the code, or editing your code?
- well you get the idea.....

You could manually test your code for all the above, but often (not always) it is just is easier/quicker to run a suite of tests to give you confidence your code is behaving as expected.

Obviously your tests are only as good as the person who wrote them, but if 


### Part 1 - Manually testing your code
Yep, we've all done it, manually clicking around your applications, or executing a function and using console.logs to check our functions are doing what we expect. 

```
function add(num1, num2){
    return num1 + num2;
}

console.log (add(1,1)) //<- And hope that this logs 2 in our console.
``` 

In fact I still do this alot of the time, because I'm short on time I just need to "get things done".

But even though we never do this, you could just use some logic to run and check functions.  We often already do this, but specifically for testing, we could seperate our modules, and tests, by exporting our functions, and importing them into a seperate spec or test file and running that file to see if our functions are behaving correctly.

### Part 2 - A testing without a framework
So what we could do is export our add function above, and then import it into a seperate test javascript file.  Then you can run your function and check if it is behaving as you'd expect using a simple "if" statement.  You don't need any fancy frameworks to do this:

```
const {add} = require('moduleName');

const result = add(4,5);
const expected = 9;

if (result != expected){
    throw new Error("The add function did not return 9 when adding 4 and 5");
}

console.log("Passed all tests");
```

Try the code in the 02_basic_function_spec.js file to see the above in action.  So what is happening?
- the add function returns a value which is assigned to result.  
- The results is compared to the expected result and logs an error if it isn't correct.
- if everything is good we get the console log telling us all tests have passed.

There we are, our first automated test!  

So let's take this a little further using the NodeJS assert module. 

### Part 3 - Tests using the NodeJS 'assert' module
The assert module comes with NodeJS. The assert statement exists in pretty much every programming language.  All assertions do is test that condition, and immediately trigger an error if the condition is false.  We can use assert to simplify our "if" function is doing in the previous code snippet.  

first import the 'assert' module:
```
const assert = require('assert');
```

Then this one line does the same as our whole if function block:

```
assert(add(4,5) === 9, "The add function did not return 9 when adding 4 and 5");
```

or we could use assert methods to be more explicit:
```
assert.equals(add(4,5), 9, "The add function did not return 9 when adding 4 and 5")
```

Check out [this link](https://www.w3schools.com/nodejs/ref_assert.asp) for details of all assertion methods of the NodeJS assert module.

#### Why can't I use assertions for all my tests?
It seems like we've got our tests sorted right?  Well, no, we're testing one function which is fine. 

Try having more than one test, then make first one fail, you notice that your code stops running and throws and error at the first test. So you would have to resolve the tests in the set order.  You do not get an overview of your entire application.  

Here are some of the issues:
- The tests run syncronously, and therefore stop at the first failed test
- The errors in the console are not very pretty or readable;
- There is no easy way to group tests together;
- No additional info, like the time taken, what tests have run; and much more

Obviously you could start to program all these things into your tests, but this is where Mocha shines......

### Part 4 - Using Mocha for testing
Start by installing mocha globally or within your project using npm.  

You can run a specific test file by running (if installed globally): ``` mocha test_file.js```  if you put a console log, you'll see it shows up in your console.  So all mocha is doing is running your Javascript file as it would be normally.  

Except it is looking for describe and it functions:

```
describe('What this group of tests are for, or where they come from', function (){
    it('describe what is should do', function(){
        // Put all your assertions in here
    });
});
```

Now all the tests get grouped nicely in the console, everything is also run asychronously, so a failed test doesn't stop other tests from running, but all the tests are run in series, so you can get an accurate idea of how long each test takes to run, and identify slow functions/tests.

TODO! how does Mocha run? What is going on

### Integrating Mocha into your workflow.
This is all very nice, but when starting out it tends to feel like this is a lot of extra code to write.  So how can we effectively create tests without sacrificing our development speed? 

Well our tests always follow the same format, its a describe function with a callback, constaining an it function with our assertions.  So code snippets are really useful here.  What ever IDE you use, seek out snippets, in visual studio code there is a extension which you can install, and with a simple fd + downarrow + tab, you have the previous code snippet.

But you don't need to actually write all your test yet, if you leave out the call back from the "it" function you can simply start to plan your application, and when you run your tests the test will be logged as pending.

When writing you tests you it takes you out of the details of what how you will program your code, and gets you thinking about exactly how the code will behave what kind of inputs it will take, what it won't take and what it will return, or how it'll behave.  

It's a little like writing psuedo code but at a higher level, or even like a checklist, you are just describing what each part of the code should do.  

In a team this can be really useful. Someone managing a project or coming up with architecture of the application, can write a load of tests and distribute it amongst a team or programmers and get them to make the tests pass.

As your application grows and grows the number of tests will do too or say you are coming in on a very large project. When you run mocha, it'll run all your tests, hopefully all your tests will pass.   But maybe a few failed, or maybe you have some pending tests, or perhaps you've been asked to work on one part of your application.   You can get mocha to run specific files as you've seen above, if you want to work on specific tests, and ignore the rest.  Suite methods such as ```.only()``` and ```.skip()``` come in handy.  You can use ```.only()``` on more than one suite and it'll run only those suites, inversely ```.skip()``` will skip that test when you run mocha, but will be marked as pending.

You can see which tests take a long time, mocha's slow parameter defaults to 75ms.  You can set this parameter to what ever you want for each test.  If it comes close you to that time it'll give you a time to completion in yellow, and if it has exceeded this value it'll be red.

there are lots of other things you can do in the test cycle, to see the run cycle and the available hooks of the mocha test process check out [this link](https://mochajs.org/#run-cycle-overview)

//TODO! use correct terminology describe and 

What about reporters?

So mocha is lovely but there are loads of different kind of reporter in the console to suit your tastes.

- landing  // cute!
- progress //
- docs // creates a html doc, you can run mocha --reporter doc > report.html 

### Part 6-But what about chai?!!
So what about chai? Well assert is great but it isn't all that readable, and it has it's limitations.  Chai offers us an "expressive language & readable style".  What I find is it's fairly intuitive in that assertions can be formed to read much like English.

Chai comes in three "flavours":
- Assert: which is very much like your assert module in nodeJS but with some additional functionality
- Expect: is a function that takes a value as an argument then chains assertions on to the back of that.
- Should: extends each object with a should a should property to start your chain.  This makes it really nice to read, given that this extends the Object prototype, and adds a should property,  there are some scenarios where should will not work. Mainly, if you are trying to check the existence of an object. Take the following pseudo-code.  Additionally it doesn't work with internet explorer

Here are examples of all three "flavours" doing exactly the same thing:
```
assert.equal([1,2,3].indexOf(4), -1);
//and 
expect([1,2,3].indexOf(4)).to.be.equal(-1);
//and 
[1,2,3].indexOf(4).should.equal(-1);
// all basically do assert the same thing, it's just a matter of taste.
```

Expect and Should flavours become very much like writing descriptions in english rather than coding, so it feels very intuitive. See below for some examples:
```
"This text".should.be.a('string');
"This text".should.equal('This text');
```
Often I'll just guess an assertion and it'll work.

These chainable getters, do actually do anything they simply make your assertions more readable.
- to
- be
- been
- is
- that
- which
- and
- has
- have
- with
- at
- of
- same
- but
- does

promises can be tested using the method **.eventually** you can do lots of other stuff [like this](https://www.chaijs.com/plugins/chai-as-promised/)


### Summary
So hopefully with the above you can see what how mocha and chai help us create a nice readable tests. Although there are many philosophies around testing, hopefully what I've shown you that

- a) it's very easy to get a test set up, with some code snippets and some intuitive assertions like chai it doesn't require much extra work.
- b) I'm not going to tell you how to do testing or how much coverage you need, but this is a really useful tool when trying to create some nice code.  
- c) it took me a while to convince myself that test were worth it but once I was into that zone it's a really forces you to think in a way 
- d) There is something psychologically satisfying and encouraging about making those crosses turn green, I think it does the increases flow if you can get this into your project.
- e) I encourage you to write some tests, next time you have trouble with some code try and put some tests down and work at it in that way.






