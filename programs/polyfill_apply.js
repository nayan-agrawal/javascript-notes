// Polyfill for Apply method
Function.prototype.myApply = function (context = {}, args = []) {
    if (typeof this !== 'function') {
        throw new Error(this + "is not callable!");
    }

    if (!Array.isArray(args)) {
        throw new TypeError("CreateListFromArrayLike called on non-object");
    }

    context.fn = this;
    context.fn(...args);
}

let car1 = {
    color: 'Red',
    company: 'Ferrari'
}

function purchaseCar(currency, price) {
    console.log(`I have purchased ${this.color} - ${this.company} car for ${currency}${price}`);
}

purchaseCar.myApply(car1, ["$", 5000]);