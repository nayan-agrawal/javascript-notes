// Polyfill for filter
Array.prototype.filter = function (callbackFn) {
    if (typeof callbackFn !== 'function') {
        throw new TypeError('Callback must be a function');
    }

    const output = [];
    this.forEach((element, index) => {
        if (callbackFn(element, index, this)) {
            output.push(element);
        }
    })
    return output;
}

console.log([1, 2, 3, 4, 5, 6].filter((ele) => ele % 2 !== 0));