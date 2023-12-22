# Introduction
We use call, bind and apply methods to set the this keyword independent of how the function is called. This is especially useful for the callbacks.Every function object is also given a few unique methods and attributes by JavaScript. These are the methods that every JavaScript function inherits. Every function inherits certain methods, such as call, bind, and apply.

### Bind
The bind method creates a new function and sets the this keyword to the specified object.

```
function.bind(thisArg, optionalArguments)
```

Let us understand this by considering an example
```
const john = {
    name: 'John',
    age: 24,
};
const jane = {
    name: 'Jane',
    age: 22,
};
function greet() {
    console.log(`Hi, I am ${this.name} and I am ${this.age} years old`);
}
```

We can use the bind method on the greeting function to bind the this keyword to john and jane objects. 

```
const greetingJohn = greeting.bind(john);

// Hi, I am John and I am 24 years old
greetingJohn();

const greetingJane = greeting.bind(jane);

// Hi, I am Jane and I am 22 years old
greetingJane()
```

Here greeting.bind(john) creates a new function with this set to john object, which we then assign to greetingJohn variable. Similarly for greetingJane.

### Call
The call method initializes the this inside the function and launches it right away. 

In contrast to bind(), which produces a copy of the function and sets the this keyword, call() sets the this keyword, executes the function instantly, and does not create a new copy of the function.

```
function.call(thisArg, arg1, agr2, ...)
```

Let us understand this with an example
```
function greeting() {
    console.log(`Hi, I am ${this.name} and I am ${this.age} years old`);
}
const john = {
    name: 'John',
    age: 24,
};

const jane = {
    name: 'Jane',
    age: 22,
};

// Hi, I am John and I am 24 years old
greeting.call(john);

// Hi, I am Jane and I am 22 years old
greeting.call(jane)
```

Above example is similar to the bind() example except that call() does not create a new function. We are directly setting the this keyword using call().

### Apply
The apply() method is similar to call(). The difference is that the apply() method accepts an array of arguments instead of comma separated values.

```
Syntax: function.apply(thisArg, [argumentsArr])
```

For Example
```
function greet(greeting, lang) {
    console.log(lang);
    console.log(`${greeting}, I am ${this.name} and I am ${this.age} years old`);
}

const john = {
    name: 'John',
    age: 24,
};

const jane = {
    name: 'Jane',
    age: 22,
};

// Hi, I am John and I am 24 years old
greet.apply(john, ['Hi', 'en']);

// Hi, I am Jane and I am 22 years old
greet.apply(jane, ['Hola', 'es']);
```