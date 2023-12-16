# Closures  in JS

* Function bundled along with it's lexical scope is **closure**.

* JavaScript has a lexcial scope environment. If a function needs to access a variable, it first goes to its local memory. When it does not find it there, it goes to the memory of its lexical parent. See Below code, Over here function **y** along with its lexical scope i.e. (function x) would be called a closure.
    ```js
    function x() {
        var a = 7;
        function y() {
            console.log(a);
        }
        return y;
    }
    var z = x();
    console.log(z);  // value of z is entire code of function y.
    ```
    * In above code, When y is returned, not only is the function returned but the entire closure (fun y + its lexical scope) is returned and put inside z. So when z is used somewhere else in program, it still remembers var a inside x()

* Another Example
```js
    function z() {
        var b = 900;
        function x() {
            var a=7;
            function y(){
                console.log(a,b);
            }
            y();
        }
        x();
    }
    z();    // 7 900
```

* Thus In simple words, we can say:
    * ***A closure is a function** that has access to its outer function scope even after the function has returned. Meaning, A closure can remember and access variables and arguments reference of its outer function even after the function has returned.*


<br>

![Closure Explaination](../assets/images/closure.jpg "Lexical Scope")

* Advantages of Closure:
  * Module Design Pattern
  * Currying
  * Memoize
  * Data hiding and encapsulation
  * setTimeouts etc.

* Disadvantages of Closure:
  * Over consumption of memory
  * Memory Leak
  * Freeze browser


## setTimeout and Closures Interview Questions
> **Time, tide and Javascript wait for none.**

*   ```js
    function x() {
        var i = 1;
        setTimeout(function() {
            console.log(i);
        }, 3000);
        console.log("Namaste Javascript");
    }
    x();
    // Output:
    // Namaste Javascript
    // 1 // after waiting 3 seconds
    ```
    * We expect JS to wait 3 sec, print 1 and then go down and print the string. But JS prints string immediately, waits 3 sec and then prints 1.
    * The function inside setTimeout forms a closure (remembers reference to i). So wherever function goes it carries this ref along with it. 
    * setTimeout takes this callback function & attaches timer of 3000ms and stores it. Goes to next line without waiting and prints string. 
    * After 3000ms runs out, JS takes function, puts it into call stack and runs it. 
 
* Q: Print 1 after 1 sec, 2 after 2 sec till 5 : Tricky interview question
 
    We assume this has a simple approach as below
    ```js
    function x() {
    for(var i = 1; i<=5; i++){
        setTimeout(function() {
        console.log(i);
        }, i*1000);
        }
        console.log("Namaste Javascript");
    }
    x();
    // Output:
    // Namaste Javascript
    // 6
    // 6
    // 6
    // 6
    // 6
    ```
    * Reason?
        * This happens because of closures. When setTimeout stores the function somewhere and attaches timer to it, the function remembers its reference to i, **not value of i**. All 5 copies of function point to same reference of i. JS stores these 5 functions, prints string and then comes back to the functions. By then the timer has run fully. And due to looping, the i value became 6. And when the callback fun runs the variable i = 6. So same 6 is printed in each log
        
        * To avoid this, we can use **let** instead of **var** as let has Block scope. For each iteration, the i is a new variable altogether(new copy of i). Everytime setTimeout is run, the inside function forms closure with new variable i

    * But what if interviewer ask us to implement using **var**?
 
        ```js
        function x() {
            for(var i = 1; i<=5; i++){
            function close(i) {
                setTimeout(function() {
                console.log(i);
                }, i*1000);
                // put the setT function inside new function close()
            }
            close(i); // everytime you call close(i) it creates new copy of i. Only this time, it is with var itself!
            }
            console.log("Namaste Javascript");
        }
        x();
        ```

### Famous Interview Questions ft. Closures

#### Q1: What is Closure in Javascript?
**Ans**: A function along with reference to its outer environment together forms a closure. Or in other words, A Closure is a combination of a function and its lexical scope bundled together.
eg:
```js
function outer() {
    var a = 10;
    function inner() {
        console.log(a);
    } // inner forms a closure with outer
    return inner;
}
outer()(); // 10 // over here first `()` will return inner function and then using secong `()` to call inner function 
```

#### Q2: Will the below code still forms a closure?
```js
function outer() {
    function inner() {
        console.log(a);
    }
    var a = 10;
    return inner;
}
outer()(); // 10
```
**Ans**: Yes, because inner function forms a closure with its outer environment so sequence doesn't matter.

#### Q3: Changing var to let, will it make any difference?
```js
function outer() {
    let a = 10;
    function inner() {
        console.log(a);
    }
    return inner;
}
outer()(); // 10
```
**Ans**: It will still behave the same way.

#### Q4: Will inner function have the access to outer function argument?
```js
function outer(str) {
    let a = 10;
    function inner() {
        console.log(a, str);
    }
    return inner;
}
outer("Hello There")(); // 10 "Hello There"
```
**Ans**: Inner function will now form closure and will have access to both a and str.

#### Q5: In below code, will inner form closure with **outest**?
```js
function outest() {
    var c = 20;
    function outer(str) {
        let a = 10;
        function inner() {
            console.log(a, c, str);
        }
        return inner;
    }
    return outer;
}
outest()("Hello There")(); // 10 20 "Hello There"
```
**Ans**: Yes, inner will have access to all its outer environment.

#### Q6: Output of below code and explaination?
```js
function outest() {
    var c = 20;
    function outer(str) {
        let a = 10;
        function inner() {
            console.log(a, c, str);
        }
        return inner;
    }
    return outer;
}
let a = 100;
outest()("Hello There")(); // 10 20 "Hello There"
```
**Ans**: Still the same output, the inner function will have reference to inner a, so conflicting name won't matter here. If it wouldn't have find a inside outer function then it would have went more outer to find a and thus have printed 100. So, it try to resolve variable in scope chain and if a wouldn't have been found it would have given reference error.

#### Q7: Advantage of Closure?
  * Module Design Pattern
  * Currying
  * Memoize
  * Data hiding and encapsulation
  * setTimeouts etc.

### Q8: Discuss more on Data hiding and encapsulation?
```js
// without closures
var count = 0;
function increment(){
  count++;
}
// in the above code, anyone can access count and change it. 

------------------------------------------------------------------

// (with closures) -> put everything into a function
function counter() {
  var count = 0;
  function increment(){
    count++;
  }
}
console.log(count); // this will give referenceError as count can't be accessed. So now we are able to achieve hiding of data

------------------------------------------------------------------

//(increment with function using closure) true function
function counter() {
  var count = 0;
  return function increment(){
    count++;
    console.log(count);
  }
}
var counter1 = counter(); //counter function has closure with count var. 
counter1(); // increments counter

var counter2 = counter();
counter2(); // here counter2 is whole new copy of counter function and it wont impack the output of counter1

*************************

// Above code is not good and scalable for say, when you plan to implement decrement counter at a later stage. 
// To address this issue, we use *constructors*

// Adding decrement counter and refactoring code:
function Counter() {
//constructor function. Good coding would be to capitalize first letter of constructor function. 
  var count = 0;
  this.incrementCounter = function() { //anonymous function
    count++;
    console.log(count);
  }
   this.decrementCounter = function() {
    count--;
    console.log(count);
  }
}

var counter1 = new Counter();  // new keyword for constructor fun
counter1.incrementCounter();
counter1.incrementCounter();
counter1.decrementCounter();
// returns 1 2 1
```

#### Q9: Disadvantage of closure?
**Ans**: Overconsumption of memory when using closure as everytime as those closed over variables are not garbage collected till program expires.
So when creating many closures, more memory is accumulated and this can create memory leaks if not handled.

**Garbage collector** : Program in JS engine or browser that frees up unused memory. In highlevel languages like C++ or JAVA, garbage collection is left to the programmer, but in JS engine its done implicitly.

```js
function a() {
  var x = 0;
  return function b() {
    console.log(x);
  }
}
 
var y = a(); // y is a copy of b()
y(); 
 
 // Once a() is called, its element x should be garbage collected ideally. But fun b has closure over var x. So mem of x cannot be freed. Like this if more closures formed, it becomes an issue. To tacke this, JS engines like v8 and Chrome have smart garbage collection mechanisms. Say we have var x = 0, z = 10 in above code. When console log happens, x is printed as 0 but z is removed automatically.
```
