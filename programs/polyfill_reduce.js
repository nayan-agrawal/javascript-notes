// Polyfill for reduce method
Array.prototype.reduce = function (callbackFn, initialValue) {
    if (typeof callbackFn !== 'function') {
        throw new TypeError("Callback must be a function");
    }

    const arr = this;
    let accumulator = initialValue !== undefined ? initialValue : arr[0];
    for (let i = initialValue !== undefined ? 0 : 1; i < arr.length; i++) {
        if (i in arr) {
            accumulator = callbackFn.call(undefined, accumulator, arr[i], i, arr);
        }
    }

    return accumulator;
}

// Testing
console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((acc, currentValue) => { return acc + currentValue }));