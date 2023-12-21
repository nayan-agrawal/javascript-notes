// Polyfill for map
Array.prototype.map = function (callbackFn) {
    if (typeof callbackFn !== 'function') {
        throw new TypeError('Callback must be a function');
    }
    const output = [];
    this.forEach((element, index) => {
        output.push(callbackFn(element, index, this));
    });
    return output;
}

// Test
console.log([1, 2, 3, 4, 5].map((ele) => ele * 2));