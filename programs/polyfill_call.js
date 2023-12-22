// Polyfill for Call method
Function.prototype.myCall = function (context = {}, ...args) {
    if (typeof this !== 'function') {
        throw new Error(this + "is not callable!");
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

purchaseCar.myCall(car1, "Rs.", 500000);