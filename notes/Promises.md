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

Now, we will make `createOrder` function which returns a promise and we will capture that `promise` into a `variable`.

Promise is nothing but an empty object with some data value in it, and this data value will hold whatever this `createOrder` function will return.

Since `createOrder` function is an async function and we don't know how much time will it take to finish execution.

So the moment `createOrder` will get executed, it will return you a `undefined` value. Let's say after 5 secs `createOrder` function is executed successfully and now `orderId` is ready so, it will fill the `undefined` value with the `orderId`.

In short, When `createOrder` get executed, it immediately returns a `promise object` with `undefined` value. then javascript will continue to execute with other lines of code. After sometime when `createOrder` has finished execution and `orderId` is ready then that will `automatically` be assigned to our returned `promise` which was earlier `undefined`.

Q: How we will get to know `response` is ready?  
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

Promise guarantee, it will callback the attached function once it has the fulfilled data. And it will call it only once.

Earlier we talked about promise are object with empty data but that's not entirely true, `Promise` are much more than that.

Now let's understand and see a real promise object.

fetch is a web-api used to make API calls and it returns a promise.

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

### Promise Methods in JavaScript

##### Promise.all() method
This method is used to execute multiple asynchronous tasks simultaneously without having to wait for another task to finish.

Suppose we have three promises and all are resolved successfully:

```
const promise1 = new Promise((resolve, reject) => resolve('promise1 success'));
const promise2 = new Promise((resolve, reject) => resolve('promise2 success'));
const promise3 = new Promise((resolve, reject) => resolve('promise3 success'));
```
Now, let's use the Promise.all method.
`Promise.all` needs an array of promises as its argument.

```
Promise.all([promise1, promise2, promise3])
  .then((result) => {
    console.log('resolved', result); // resolved ["promise1 success", "promise2 success", "promise3 success"]
  })
  .catch((error) => {
    console.log('rejected', error);
  });
```
As all the promises are resolved, result will be an array containing the results of the resolved promises.
Now, what if any of the promises get rejected?

```
const promise1 = new Promise((resolve, reject) => resolve('promise1 success'));
const promise2 = new Promise((resolve, reject) => reject('promise2 failure'));
const promise3 = new Promise((resolve, reject) => resolve('promise3 success'));

Promise.all([promise1, promise2, promise3])
  .then((result) => {
    console.log('resolved', result);
  })
  .catch((error) => {
    console.log('rejected', error); // rejected promise2 failure
  });
```
In the above code, promise2 is rejected so the catch handler will be executed, and in the case of Promise.all:

 - If one of the promises is rejected, the error will contain the error message of the failed promise (as in our case above)
 - If multiple promises are rejected, the error will be the error message of the first failed promise.

Note: Even though the intermediate promise gets rejected, all next promises will not be stopped from executing. They will all be executed – but only the first rejected promise value will be available in the error parameter of the catch block.

#### Promise.race() method
Consider again the three resolved promises:

```
const promise1 = new Promise((resolve, reject) => resolve('promise1 success'));
const promise2 = new Promise((resolve, reject) => resolve('promise2 success'));
const promise3 = new Promise((resolve, reject) => resolve('promise3 success'));

Promise.race([promise1, promise2, promise3])
  .then((result) => {
    console.log('resolved', result); // resolved promise1 success
  })
  .catch((error) => {
    console.log('rejected', error);
  });
```
As you can see here, as soon as the first promise gets resolved, the `Promise.race` method will return the result of that resolved promise.

Now, take a look at the below code:

```
const promise1 = new Promise((resolve, reject) => reject('promise1 failure'));
const promise2 = new Promise((resolve, reject) => resolve('promise2 success'));
const promise3 = new Promise((resolve, reject) => resolve('promise3 success'));

Promise.race([promise1, promise2, promise3])
  .then((result) => {
    console.log('resolved', result);
  })
  .catch((error) => {
    console.log('rejected', error); // rejected promise1 failure
  });
```

As you can see here, the first promise itself is rejected so the .catch handler will be executed.
So when we use the Promise.race method, it will wait until the first promise gets resolved or rejected and then:
 - If the first promise in the promise chain gets resolved, the .then handler will be executed and the result will be the result of the first resolved promise.
 - If the first promise in the promise chain gets rejected, the .catch handler will be executed and the result will be the result of the first failed promise.
 - If multiple promises are rejected, the .catch handler will be executed and the result will be the result of the first failed promise.


#### Promise.allSettled() method
This method is useful when you want to know the result of each task even though they are rejected.

Because in `Promise.all` and `Promise.race`, we get only the result of the first rejected promise and there is no way to get the result of other successful or failed promises.

So using `Promise.allSettled` we can get the result of all the promises, even if they failed.
Take a look at the below code:

```
const promise1 = new Promise((resolve, reject) => resolve('promise1 success'));
const promise2 = new Promise((resolve, reject) => resolve('promise2 success'));
const promise3 = new Promise((resolve, reject) => resolve('promise3 success'));

Promise.allSettled([promise1, promise2, promise3]).then((result) => {
  console.log('resolved', result);
});

/* output from `.then`:
resolved [
  {
    "status": "fulfilled",
    "value": "promise1 success"
  },
  {
    "status": "fulfilled",
    "value": "promise2 success"
  },
  {
    "status": "fulfilled",
    "value": "promise3 success"
  }
]
*/
```

As you can see, the Promise.allSettled method waits until all the promises are resolved or rejected and the result will contain the result of each promise.

```
const promise1 = new Promise((resolve, reject) => reject('promise1 failure'));
const promise2 = new Promise((resolve, reject) => resolve('promise2 success'));
const promise3 = new Promise((resolve, reject) => resolve('promise3 success'));

Promise.allSettled([promise1, promise2, promise3]).then((result) => {
  console.log('resolved', result);
});

/* output from `.then`:
resolved [
  {
    "status": "rejected",
    "reason": "promise1 failure"
  },
  {
    "status": "fulfilled",
    "value": "promise2 success"
  },
  {
    "status": "fulfilled",
    "value": "promise3 success"
  }
]
*/
```

In the above case, even though the first promise is rejected, we get the result of all the promises inside the `.then` handler.

```
const promise1 = new Promise((resolve, reject) => reject('promise1 failure'));
const promise2 = new Promise((resolve, reject) => reject('promise2 failure'));
const promise3 = new Promise((resolve, reject) => reject('promise3 failure'));

Promise.allSettled([promise1, promise2, promise3]).then((result) => {
  console.log('resolved', result);
});

/* output from `.then`:
 resolved [
  {
    "status": "rejected",
    "reason": "promise1 failure"
  },
  {
    "status": "rejected",
    "reason": "promise2 failure"
  },
  {
    "status": "rejected",
    "reason": "promise3 failure"
  }
] 
*/
```
Here, even though all the promises are rejected, still the `.then` handler will be executed and we get the result of each promise.