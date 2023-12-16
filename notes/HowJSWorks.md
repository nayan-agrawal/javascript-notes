# How JavaScript works?

#### Execution context in JavaScript

Everything in javascript happens inside the **Execution Context**. It can be thought of as a big container where the entire javascript code is executed. The execution context has two components:
 - **Memory Component**: This is where variables and functions are stored as key-value pairs. This component is also known as the variable environment.
 - **Code Component**: This is where the code is executed one line at a time. This component is also known as the thread of execution.

#### What is Synchronous Single-Threaded Language?
JavaScript is a synchronous single-threaded language. This means that it can only execute one command at a time and in a specific order. It can only move to the next line once the current line has been finished executing.

It's important to note that asynchronous programming is possible in javascript using AJAX.

#### How Javascript is executed?
When a Javascript program is ran, a global execution context is created. The execution context is created in two phases
 - Memory creation phase - JS will allocate memory to variables and functions.
 - Code Execution Phase - JS Code is executed line by line.

Let's understand this by considering the below example
```
var n = 2;
function square(num) {
 var ans = num * num;
 return ans;
}
var square2 = square(n);
var square4 = square(4);
```

The initial step in JavaScript involves the memory creation phase. It begins by moving through the code snippet from the top. Firstly, it reserves memory for the variable 'n' in line one and for the function 'square' in line two. 'n' is initialized with 'undefined,' a unique value for it, while the complete code of the 'square' function is stored in its allocated memory space. Similarly, memory is allocated for 'square2' and 'square4' as variables, initializing them with 'undefined' as well. This marks the conclusion of the initial phase, known as the memory creation phase.

Moving into the second phase, known as the code execution phase, JavaScript proceeds to navigate through the entire code sequentially. Upon encountering 'var n = 2,' it assigns the value 2 to the variable 'n.' Prior to this assignment, 'n' held an undefined value. Concerning the function, there's no immediate action to execute as these lines were already handled during the memory creation phase.

Now, focusing on line 6, which reads 'var square2 = square(n),' functions operate uniquely compared to other languages. It initiates a completely new execution context. Once again, within this fresh execution context, during the memory creation phase, memory is allocated to 'num' and 'ans'—both variables are initialized with the 'undefined' value. Subsequently, within the code execution phase of this context, the value 2 is assigned to 'num.' Following this, 'var ans = num * num' computes 4 as the value stored in 'ans.' Lastly, 'return ans' relinquishes control of the program back to the point where this function was called.

Upon encountering the 'return' keyword, control is redirected to the line where the function was called, and concurrently, the function's execution context gets removed. This process recurs for 'square4,' and once completed, the global execution context will be eliminated. Consequently, the final diagram before deletion would appear similar to the following representation.

![Code Snipper](../assets/images/final_execution_context.jpg)

 - JavaScript handles the creation and removal of code execution contexts through the utilization of the Call Stack.
 - The Call Stack functions as a tool to monitor the script's position, especially when it involves calling multiple functions.
 - Maintaining the sequence of execution contexts, the Call Stack is alternatively referred to as the Program Stack, Control Stack, Runtime Stack, Machine Stack, or Execution Context Stack.






