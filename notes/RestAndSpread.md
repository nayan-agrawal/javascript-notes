### Spread Operator [...]
The spread operator helps us expand an iterable such as an array where multiple arguments are needed, it also helps to expand the object expressions. In cases where we require all the elements of an iterable or object to help us achieve a task, we use a spread operator.

```
Syntax 
var var_name = [...iterable]; 
```
Now, let us look at the example below
```
var array1 = [10, 20, 30, 40, 50];
var array2 = [60, 70, 80, 90, 100];
var array3 = [...array1, ...array2];
console.log(array3);
// Output: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
```

### Rest Parameter (...)
The rest parameter is converse to the spread operator. while the spread operator expands elements of an iterable, the rest operator compresses them. It collects several elements. In functions when we require to pass arguments but were not sure how many we have to pass, the rest parameter makes it easier. 
Note: There must be only one rest parameter in javascript functions.

```
Syntax
function function_name(...arguments) {
    statements;
}
```
Now, let us look at the example below to understand it in better way
```
function average(...args) {
    console.log(args);
    var avg =
        args.reduce(function (a, b) {
            return a + b;
    }, 0) / args.length;
    return avg;
}
console.log("average of numbers is : "
    + average(1, 2, 3, 4, 5));
console.log("average of numbers is : "
    + average(1, 2, 3));

// OUTPUT:
// [1, 2, 3, 4, 5]
// "average of numbers is : 3"
// [1, 2, 3]
// "average of numbers is : 2"
```