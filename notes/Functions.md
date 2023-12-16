# Functions in JS

> Functions are heart ♥ of Javascript.

### Q: What is Function statement? 
Below way of creating function are function statement.
```js
function a() {
  console.log("Hello");
}
a(); // Hello
```

### Q: What is Function Expression?
Assigning a function to a variable. Function acts like a value.
```js
var b = function() {
  console.log("Hello");
}
b();
```

### Q: Difference between function statement and expression
The major difference between these two lies in **Hoisting**.
```js
a(); // "Hello A"
b(); // TypeError
function a() {
  console.log("Hello A");
}
var b = function() {
  console.log("Hello B");
}
// Why? During mem creation phase a is created in memory and function assigned to a. But b is created like a variable (b:undefined) and until code reaches the function()  part, it is still undefined. So it cannot be called.
```
### Q: What is Function Declaration?
Other name for **function statement**.

### Q: What is Anonymous Function?
A function without a name.
```js
function () {

}// this is going to throw Syntax Error - Function Statement requires function name.
```
- They don't have their own identity. So an anonymous function without code inside it results in an error. 
- Anonymous functions are used when functions are used as values eg. the code sample for **function expression** above.

### Q: What is Named Function Expression?
Same as Function Expression but function has a name instead of being anonymous.
```js
var b = function xyz() {
  console.log("b called");
}
b(); // "b called"
xyz(); // Throws ReferenceError:xyz is not defined.
// xyz function is not created in global scope. So it can't be called.
```

### Q: Parameters vs Arguments?
```js
var b = function(param1, param2) { // labels/identifiers are parameters
  console.log("b called");
}
b(arg1, arg2); // arguments - values passed inside function call
```

### Q: What is First Class Function aka First Class Citizens?
We can pass functions inside a function as arguments and 
/or return a function(HOF). These ability are altogether known as First class function. It is programming concept available in some other languages too.
```js
var b = function(param1) {
  console.log(param1); // prints " f() {} "
}
b(function(){});

// Other way of doing the same thing:
var b = function(param1) {
  console.log(param1);
}
function xyz(){
}
b(xyz); // same thing as prev code

// we can return a function from a function:
var b = function(param1) {
  return function() {
  }  
}
console.log(b()); //we log the entire fun within b. 
```

### Arrow Functions
**Arrow function** {()=>} is concise way of writing JavaScript functions in shorter way. Arrow functions were introduced in the ES6 version. They make our code more structured and readable.

Arrow functions are anonymous functions i.e. functions without a name but they are often assigned to any variable. They are also called **Lambda Functions**.

Advantages of using Arrow functions
 - Arrow functions reduce the size of the code.
 - The return statement and function brackets are optional for single-line functions.
 - It increases the readability of the code.
 - Arrow functions provide a lexical this binding. It means, they inherit the value of “this” from the enclosing scope. This feature can be advantageous when dealing with event listeners or callback functions where the value of “this” can be uncertain.

Disadvantages of Arrow Functions
 - Arrow functions do not have the prototype property.
 - Arrow functions cannot be used with the new keyword.
 - Arrow functions cannot be used as constructors.
 - These functions are anonymous and it is hard to debug the code.
 - Arrow functions cannot be used as generator functions that use the yield keyword to return multiple values over time.