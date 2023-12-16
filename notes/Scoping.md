# The Scope Chain, Scope & Lexical Environment
Scope in javascript is directly related to the lexical environment
Lets observe the below examples the understand the concept of scope chaining

```
// CASE 1
function a() {
    console.log(b); // 10
    // Instead of printing undefined it prints 10, So somehow this a function could access the variable b outside the function scope. 
}
var b = 10;
a();
```

```
// CASE 2
function a() {
    c();
    function c() {
        console.log(b); // 10
    }
}
var b = 10;
a();
```

```
// CASE 3
function a() {
    c();
    function c() {
        var b = 100;
        console.log(b); // 100
    }
}
var b = 10;
a();
```

```
// CASE 4
function a() {
    var b = 10;
    c();
    function c() {
        console.log(b); // 10
    }
}
a();
console.log(b); // Error, Not Defined
```

Let's try to understand the output in each of the cases above.
 - In case 1: function a is able to access variable b from Global scope.
 - In case 2: 10 is printed. It means that within nested function too, the global scope variable can be accessed
 - In case 3: 100 is printed meaning local variable of the same name took precedence over a global variable.
 - In case 4: A function can access a global variable, but the global execution context can't access any local variable

```
To summarize the above points in terms of execution context:
call_stack = [GEC, a(), c()]
Now lets also assign the memory sections of each execution context in call_stack.
c() = [[lexical environment pointer pointing to a()]]
a() = [b:10, c:{}, [lexical environment pointer pointing to GEC]]
GEC =  [a:{},[lexical_environment pointer pointing to null]]
```

![Lexical Scoping](../assets/images/lexical.jpg)
![Lexical Scoping Image 2](../assets/images/lexical2.jpg)

 - So, Lexical Environment = local memory + lexical env of its parent. Hence, Lexical Environement is the local memory along with the lexical environment of its parent
 - Lexical: In hierarchy, In order
 - Whenever an Execution Context is created, a Lexical environment(LE) is also created and is referenced in the local Execution Context(in memory space).
 - The process of going one by one to parent and checking for values is called scope chain or Lexcial environment chain.

```
function a() {
    function c() {
        // logic here
    }
    c(); // c is lexically inside a
} // a is lexically inside global execution
```

Lexical or Static scope refers to the accessibility of variables, functions and object based on physical location in source code.

```
Global {
    Outer {
        Inner
    }
}
// Inner is surrounded by lexical scope of Outer
```

An inner function can access variables which are in outer functions even if inner function is nested deep. In any other case, a function can't access variables not in its scope.

## Block Scope in JS
What is a **Block**?
* Block aka *compound statement* is used to group JS statements together into 1 group. We group them within {...}
    ```js
    {
        var a = 10;
        let b = 20;
        const c = 30;
        // Here let and const are hoisted in Block scope,
        // While, var is hoisted in Global scope.
    }
    ```

* Block Scope and its accessibility example
    ```js
    {
        var a = 10;
        let b = 20;
        const c = 30;
    }
    console.log(a); // 10
    console.log(b); // Uncaught ReferenceError: b is not defined
    ```
    * Reason?
        * In the BLOCK SCOPE; we get b and c inside it initialized as *undefined* as a part of hoisting (in a seperate memory space called **block**)
        * While, a is stored inside a GLOBAL scope. 

        * Thus we say, *let* and *const* are BLOCK SCOPED. They are stored in a separate mem space which is reserved for this block. Also, they can't be accessed outside this block. But var a can be accessed anywhere as it is in global scope. Thus, we can't access them outside the Block.

What is **Shadowing**?

* ```js
    var a = 100;
    {
        var a = 10; // same name as global var
        let b = 20;
        const c = 30;
        console.log(a); // 10
        console.log(b); // 20
        console.log(c); // 30 
    }
    console.log(a); // 10, instead of the 100 we were expecting. So block "a" modified val of global "a" as well. In console, only b and c are in block space. a initially is in global space(a = 100), and when a = 10 line is run, a is not created in block space, but replaces 100 with 10 in global space itself. 
    ```

* So, If one has same named variable outside the block, the variable inside the block *shadows* the outside variable. **This happens only for var**

* Let's observe the behaviour in case of let and const and understand it's reason.
    ```js
    let b = 100;
    {
        var a = 10;
        let b = 20;
        const c = 30;
        console.log(b); // 20
    }
    console.log(b); // 100, Both b's are in separate spaces (one in Block(20) and one in Script(another arbitrary mem space)(100)). Same is also true for *const* declarations.
    ```
    ![Block Scope Explaination](../assets/scope.jpg "Lexical Scope")


* Same logic is true even for **functions**
    ```js
    const c = 100;
    function x() {
        const c = 10;
        console.log(c); // 10
    }
    x();
    console.log(c); // 100
    ```

What is **Illegal Shadowing**?

* ```js
    let a = 20;
    {
        var a = 20;
    }
    // Uncaught SyntaxError: Identifier 'a' has already been declared
    ```
    * We cannot shadow let with var. But it is **valid** to shadow a let using a let. However, we can shadow var with let.
    * All scope rules that work in function are same in arrow functions too.
    * Since var is function scoped, it is not a problem with the code below.
        ```js
        let a = 20;
        function x() {
            var a = 20;
        }
        ```

