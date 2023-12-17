# Promises

> Promises are used to handle async operations in JavaScript.

We will discuss with code example that how things used to work before `Promises` and then how it works after `Promises`

Suppose, taking an example of E-Commerce

```js
const cart = ["shoes", "pants", "kurta"];

// Below two functions are asynchronous and dependent on each other
const orderId = createOrder(cart);
proceedToPayment(orderId);

// with Callback (Before Promise)
// Below here, it is the responsibility of createOrder function to first create the order then call the callback function
createOrder(cart, function () {
  proceedToPayment(orderId);
});
// Above there is the issue of `Inversion of Control`
```

Q: How to fix the above issue?  
_A: Using Promise._

Now, we will make `createOrder` function return a promise and we will capture that `promise` into a `variable`

Promise is nothing but we can assume it to be empty object with some data value in it, and this data value will hold whatever this `createOrder` function will return.

Since `createOrder` function is an async function and we don't know how much time will it take to finish execution.

So the moment `createOrder` will get executed, it will return you a `undefined` value. Let's say after 5 secs execution finished so now `orderId` is ready so, it will fill the `undefined` value with the `orderId`.

In short, When `createOrder` get executed, it immediately returns a `promise object` with `undefined` value. then javascript will continue to execute with other lines of code. After sometime when `createOrder` has finished execution and `orderId` is ready then that will `automatically` be assigned to our returned `promise` which was earlier `undefined`.

Q: Question is how we will get to know `response` is ready?  
_A: So, we will attach a `callback` function to the `promise object` using `then` to get triggered automatically when `result` is ready._

```js
const cart = ["shoes", "pants", "kurta"];

const promiseRef = createOrder(cart);
// this promiseRef has access to `then`

// {data: undefined}
// Initially it will be undefined so below code won't trigger
// After some time, when execution has finished and promiseRef has the data then automatically the below line will get triggered.

promiseRef.then(function () {
  proceedToPayment(orderId);
});
```

Q: How it is better than callback approach?

In Earlier solution we used to pass the function and then used to trust the function to execute the callback.

But with promise, we are attaching a callback function to a promiseObject.

There is difference between these words, passing a function and attaching a function.

Promise guarantee, it will callback the attached function once it has the fulfilled data. And it will call it only once. Just once.

Earlier we talked about promise are object with empty data but that's not entirely true, `Promise` are much more than that.

Now let's understand and see a real promise object.

fetch is a web-api which is utilized to make api call and it returns a promise.

We will be calling public github api to fetch data
https://api.github.com/users/alok722

```js
// We will be calling public github api to fetch data
const URL = "https://api.github.com/users/alok722";
const user = fetch(URL);
// User above will be a promise.
console.log(user); // Promise {<Pending>}

/** OBSERVATIONS:
 * If we will deep dive and see, this `promise` object has 3 things
 * `prototype`, `promiseState` & `promiseResult`
 * & this `promiseResult` is the same data which we talked earlier as data
 * & initially `promiseResult` is `undefined`
 *
 * `promiseResult` will store data returned from API call
 * `promiseState` will tell in which state the promise is currently, initially it will be in `pending` state and later it will become `fulfilled`
 */

/**
 * When above line is executed, `fetch` makes API call and return a `promise` instantly which is in `Pending` state and Javascript doesn't wait to get it `fulfilled`
 * And in next line it console out the `pending promise`.
 * NOTE: chrome browser has some in-consistency, the moment console happens it shows in pending state but if you will expand that it will show fulfilled because chrome updated the log when promise get fulfilled.
 * Once fulfilled data is there in promiseResult and it is inside body in ReadableStream format and there is a way to extract data.
 */
```

Now we can attach callback to above response?

Using `.then`

```js
const URL = "https://api.github.com/users/alok722";
const user = fetch(URL);

user.then(function (data) {
  console.log(data);
});
// And this is how Promise is used.
// It guarantees that it could be resolved only once, either it could be `success` or `failure`
/**
    A Promise is in one of these states:

    pending: initial state, neither fulfilled nor rejected.
    fulfilled: meaning that the operation was completed successfully.
    rejected: meaning that the operation failed.
 */
```

💡Promise Object are immutable.  
-> Once promise is fulfilled and we have data we can pass here and there and we don't have to worry that someone can mutate that data. So over above we can't directly mutate `user` promise object, we will have to use `.then`

### Interview Guide

💡What is Promise?  
-> Promise object is a placeholder for certain period of time until we receive value from asynchronous operation.

-> A container for a future value.

-> **A Promise is an object representing the eventual completion or failure of an asynchronous operation.**

We are now done solving one issue of callback i.e. Inversion of Control

But there is one more issue, callback hell...

```js
// Callback Hell Example
createOrder(cart, function (orderId) {
  proceedToPayment(orderId, function (paymentInf) {
    showOrderSummary(paymentInf, function (balance) {
      updateWalletBalance(balance);
    });
  });
});
// And now above code is expanding horizontally and this is called pyramid of doom.
// Callback hell is ugly and hard to maintain.

// 💡 Promise fixes this issue too using `Promise Chaining`
// Example Below is a Promise Chaining
createOrder(cart)
  .then(function (orderId) {
    proceedToPayment(orderId);
  })
  .then(function (paymentInf) {
    showOrderSummary(paymentInf);
  })
  .then(function (balance) {
    updateWalletBalance(balance);
  });

// ⚠️ Common PitFall
// We forget to return promise in Promise Chaining
// The idea is promise/data returned from one .then become data for next .then
// So,
createOrder(cart)
  .then(function (orderId) {
    return proceedToPayment(orderId);
  })
  .then(function (paymentInf) {
    return showOrderSummary(paymentInf);
  })
  .then(function (balance) {
    return updateWalletBalance(balance);
  });

// To improve readability you can use arrow function instead of regular function
```


## Creating a Promise, Chaining & Error Handling

###

```js
const cart = ["shoes", "pants", "kurta"];

// Consumer part of promise
const promise = createOrder(cart); // orderId
// Our expectation is above function is going to return me a promise.

promise.then(function (orderId) {
  proceedToPayment(orderId);
});

// Above snippet we have observed in our previous lecture itself.
// Now we will see, how createOrder is implemented so that it is returning a promise
// In short we will see, "How we can create Promise" and then return it.

// Producer part of Promise
function createOrder(cart) {
  // JS provides a Promise constructor through which we can create promise
  // It accepts a callback function with two parameter `resolve` & `reject`
  const promise = new Promise(function (resolve, reject) {
    // What is this `resolve` and `reject`?
    // These are function which are passed by javascript to us in order to handle success and failure of function call.
    // Now we will write logic to `createOrder`
    /** Mock logic steps
     * 1. validateCart
     * 2. Insert in DB and get an orderId
     */
    // We are assuming in real world scenario, validateCart would be defined
    if (!validateCart(cart)) {
      // If cart not valid, reject the promise
      const err = new Error("Cart is not Valid");
      reject(err);
    }
    const orderId = "12345"; // We got this id by calling to db (Assumption)
    if (orderId) {
      // Success scenario
      resolve(orderId);
    }
  });
  return promise;
}
```

Over above, if your validateCart is returning true, so the above promise will be resolved (success),

```js
const cart = ["shoes", "pants", "kurta"];

const promise = createOrder(cart); // orderId
// ❓ What will be printed in below line?
// It prints Promise {<pending>}, but why?
// Because above createOrder is going to take sometime to get resolved, so pending state. But once the promise is resolved, `.then` would be executed for callback.
console.log(promise);

promise.then(function (orderId) {
  proceedToPayment(orderId);
});

function createOrder(cart) {
  const promise = new Promise(function (resolve, reject) {
    if (!validateCart(cart)) {
      const err = new Error("Cart is not Valid");
      reject(err);
    }
    const orderId = "12345";
    if (orderId) {
      resolve(orderId);
    }
  });
  return promise;
}
```

Now let's see if there was some error and we are rejecting the promise, how we could catch that?  
-> Using `.catch`

```js
const cart = ["shoes", "pants", "kurta"];

const promise = createOrder(cart); // orderId

// Here we are consuming Promise and will try to catch promise error
promise
  .then(function (orderId) {
    // ✅ success aka resolved promise handling
    proceedToPayment(orderId);
  })
  .catch(function (err) {
    // ⚠️ failure aka reject handling
    console.log(err);
  });

// Here we are creating Promise
function createOrder(cart) {
  const promise = new Promise(function (resolve, reject) {
    // Assume below `validateCart` return false then the promise will be rejected
    // And then our browser is going to throw the error.
    if (!validateCart(cart)) {
      const err = new Error("Cart is not Valid");
      reject(err);
    }
    const orderId = "12345";
    if (orderId) {
      resolve(orderId);
    }
  });
  return promise;
}
```

Now, Let's understand the concept of Promise Chaining  
-> for this we will assume after `createOrder` we have to invoke `proceedToPayment`  
-> In promise chaining, whatever is returned from first `.then` become data for next `.then` and so on...  
-> At any point of promise chaining, if promise is rejected, the execution will fallback to `.catch` and others promise won't run.

```js
const cart = ["shoes", "pants", "kurta"];

createOrder(cart)
  .then(function (orderId) {
    // ✅ success aka resolved promise handling
    // 💡 we have return data or promise so that we can keep chaining the promises, here we are returning data
    console.log(orderId);
    return orderId;
  })
  .then(function (orderId) {
    // Promise chaining
    // 💡 we will make sure that `proceedToPayment` returns a promise too
    return proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    // from above, `proceedToPayment` is returning a promise so we can consume using `.then`
    console.log(paymentInfo);
  })
  .catch(function (err) {
    // ⚠️ failure aka reject handling
    console.log(err);
  });

// Here we are creating Promise
function createOrder(cart) {
  const promise = new Promise(function (resolve, reject) {
    // Assume below `validateCart` return false then the promise will be rejected
    // And then our browser is going to throw the error.
    if (!validateCart(cart)) {
      const err = new Error("Cart is not Valid");
      reject(err);
    }
    const orderId = "12345";
    if (orderId) {
      resolve(orderId);
    }
  });
  return promise;
}

function proceedToPayment(cart) {
  return new Promise(function (resolve, reject) {
    // For time being, we are simply `resolving` promise
    resolve("Payment Successful");
  });
}
```

Q: What if we want to continue execution even if any of my promise is failing, how to achieve this?  
-> By placing the `.catch` block at some level after which we are not concerned with failure.  
-> There could be multiple `.catch` too.
Eg:

```js
createOrder(cart)
  .then(function (orderId) {
    // ✅ success aka resolved promise handling
    // 💡 we have return data or promise so that we can keep chaining the promises, here we are returning data
    console.log(orderId);
    return orderId;
  })
    .catch(function (err) {
    // ⚠️ Whatever fails below it, catch wont care
    // this block is responsible for code block above it.
    console.log(err);
  });
  .then(function (orderId) {
    // Promise chaining
    // 💡 we will make sure that `proceedToPayment` returns a promise too
    return proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    // from above, `proceedToPayment` is returning a promise so we can consume using `.then`
    console.log(paymentInfo);
  })
```


## async await : ES6 Syntax of promises

###
Topics Covered
- What is async?
- What is await?
- How async await works behind the scenes?
- Example of using async/await
- Error Handling
- Interviews
- Async await vs Promise.then/.catch

Q: What is async?  
A: Async is a keyword that is used before a function to create a async function.

Q: What is async function and how it is different from normal function?  
```js
// 💡 async function always returns a promise, even if I return a simple string from below function, async keyword will wrap it under Promise and then return.
async function getData() {
  return "Namaste JavaScript";
}
const dataPromise = getData();
console.log(dataPromise); // Promise {<fulfilled>: 'Namaste JavaScript'}

//❓How to extract data from above promise? One way is using promise .then
dataPromise.then(res => console.log(res)); // Namaste JavaScript
```
Another example where `async` function is returning a Promise
```js
const p = new Promise((resolve, reject) => {
  resolve('Promise resolved value!!');
})

async function getData() {
  return p;
}
// In above case, since we are already returning a promise async function would simply return that instead of wrapping with a new Promise.
const dataPromise = getData();
console.log(dataPromise); // Promise {<fulfilled>: 'Promise resolved value!!'}
dataPromise.then(res => console.log(res)); // Promise resolved value!!
```

Q: How we can use `await` along with async function?  
A: `async` and `await` combo is used to handle promises.

But Question is how we used to handle promises earlier and why we even need async/await?

```js
const p = new Promise((resolve, reject) => {
  resolve('Promise resolved value!!');
})

function getData() {
  p.then(res => console.log(res));
}

getData(); // Promise resolved value!!

//📌 Till now we have been using Promise.then/.catch to handle promise.
// Now let's see how async await can help us and how it is different

// The rule is we have to use keyword await in front of promise.
async function handlePromise() {
  const val = await p;
  console.log(val);
}
handlePromise(); // Promise resolved value!!
```
📌 `await` is a keyword that can only be used inside a `async` function.
```js
await function() {} // Syntax error: await is only valid under async function.
```

Q: What makes `async`-`await` special?  
A: Let's understand with one example where we will compare async-await way of resolving promise with older .then/.catch fashion. For that we will modify our promise `p`.
```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise resolved value!!');
  }, 3000);
})

// Let's now compare with some modification:

// 📌 Promise.then/.catch way
function getData() {
  // JS engine will not wait for promise to be resolved
  p.then(res => console.log(res));
  console.log('Hello There!');
}

getData(); // First `Hello There!` would be printed and then after 3 secs 'Promise resolved value!!' will be printed.
// Above happened as Javascript wait for none, so it will register this promise and take this callback function and register separately then js will move on and execute the following console and later once promise is resolved, following console will be printed.

//❓ Problem: Normally one used to get confused that JS will wait for promise to be resolved before executing following lines.

// 📌 async-wait way:
async function handlePromise() {
  // JS Engine will waiting for promise to resolve.
  const val = await p;
  console.log('Hello There!');
  console.log(val);
}
handlePromise(); // This time `Hello There!` won't be printed immediately instead after 3 secs `Hello There!` will be printed followed by 'Promise resolved value!!'
// 💡 So basically code was waiting at `await` line to get the promise resolve before moving on to next line.

// Above is the major difference between Promise.then/.catch vs async-await

//🤓 Let's brainstorm more around async-await
async function handlePromise() {
  console.log('Hi');
  const val = await p;
  console.log('Hello There!');
  console.log(val);

  const val2 = await p;
  console.log('Hello There! 2');
  console.log(val2);
}
handlePromise(); 
// In above code example, will our program wait for 2 time or will it execute parallely.
//📌 `Hi` printed instantly -> now code will wait for 3 secs -> After 3 secs both promises will be resolved so ('Hello There!' 'Promise resolved value!!' 'Hello There! 2' 'Promise resolved value!!') will get printed immediately.

// Let's create one promise and then resolve two different promise.
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise resolved value by p2!!');
  }, 2000);
})

async function handlePromise() {
  console.log('Hi');
  const val = await p;
  console.log('Hello There!');
  console.log(val);

  const val2 = await p2;
  console.log('Hello There! 2');
  console.log(val2);
}
handlePromise(); 
// 📌 `Hi` printed instantly -> now code will wait for 3 secs -> After 3 secs both promises will be resolved so ('Hello There!' 'Promise resolved value!!' 'Hello There! 2' 'Promise resolved value by p2!!') will get printed immediately. So even though `p2` was resolved after 2 secs it had to wait for `p` to get resolved


// Now let's reverse the order execution of promise and observe response.
async function handlePromise() {
  console.log('Hi');
  const val = await p2;
  console.log('Hello There!');
  console.log(val);

  const val2 = await p;
  console.log('Hello There! 2');
  console.log(val2);
}
handlePromise(); 
// 📌 `Hi` printed instantly -> now code will wait for 2 secs -> After 2 secs ('Hello There!' 'Promise resolved value by p2!!') will get printed and in the subsequent second i.e. after 3 secs ('Hello There! 2' 'Promise resolved value!!') will get printed
```

Q: Question is Is program actually waiting or what is happening behind the scene?  
A: As we know, Time, Tide and JS wait for none. And it's true. Over here it appears that JS engine is waiting but JS engine is not waiting over here. It has not occupied the call stack if that would have been the case our page may have got frozen. So JS engine is not waiting. So if it is not waiting then what it is doing behind the scene? Let's understand with below code snippet.
```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise resolved value by p1!!');
  }, 5000);
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise resolved value by p2!!');
  }, 10000);
})

async function handlePromise() {
  console.log('Hi');
  debugger;
  const val = await p;
  console.log('Hello There!');
  debugger;
  console.log(val);

  const val2 = await p2;
  console.log('Hello There! 2');
  debugger;
  console.log(val2);
}
handlePromise(); 
// When this function is executed, it will go line by line as JS is synchronous single threaded language. Lets observe what is happening under call-stack. Above you can see we have set the break-points.

// call stack flow -> handlePromise() is pushed -> It will log `Hi` to console -> Next it sees we have await where promise is suppose to be resolved -> So will it wait for promise to resolve and block call stack? No -> thus handlePromise() execution get suspended and moved out of call stack -> So when JS sees await keyword it suspend the execution of function till promise is resolved -> So `p` will get resolved after 5 secs so handlePromise() will be pushed to call-stack again after 5 secs. -> But this time it will start executing from where it had left. -> Now it will log 'Hello There!' and 'Promise resolved value!!' -> then it will check whether `p2` is resolved or not -> It will find since `p2` will take 10 secs to resolve so the same above process will repeat -> execution will be suspended until promise is resolved.

// 📌 Thus JS is not waiting, call stack is not getting blocked.

// Moreover in above scenario what if p1 would be taking 10 secs and p2 5 secs -> even though p2 got resolved earlier but JS is synchronous single threaded language so it will first wait for p1 to be resolved and then will immediately execute all.
```

### Real World example of async/await

```js
async function handlePromise() {
  // fetch() => Response Object which as body as Readable stream => Response.json() is also a promise which when resolved => value
  const data = await fetch('https://api.github.com/users/alok722');
  const res = await data.json();
  console.log(res);
};
handlePromise()
```

### Error Handling

While we were using normal Promise we were using .catch to handle error, now in `async-await` we would be using `try-catch` block to handle error.

```js
async function handlePromise() {
  try {
    const data = await fetch('https://api.github.com/users/alok722');
    const res = await data.json();
    console.log(res);
  } catch (err) {
    console.log(err)
  }
};
handlePromise()

// In above whenever any error will occur the execution will move to catch block. One could try above with bad url which will result in error.

// Other way of handling error:
handlePromise().catch(err => console.log(err)); // this will work as handlePromise will return error promise in case of failure.
```

### Async await vs Promise.then/.catch
What one should use? `async-await` is just a syntactic sugar around promise. Behind the scene `async-await` is just promise. So both are same, it's just `async-await` is new way of writing code. `async-await` solves few of the short-coming of Promise like `Promise Chaining`. `async-await` also increases the readability. So sort of it is always advisable to use `async-await.`

