// Polyfill for Apply method
Function.prototype.myBind = function (context = {}, ...args) {
    if (typeof this !== 'function') {
        throw new Error(this + "cannot be bound as it's not callable!");
    }
    context.fn = this;
    return function (...newArgs) {
        return context.fn(...args, ...newArgs);
    }
}

let car1 = {
    color: 'Red',
    company: 'Ferrari'
}

function purchaseCar(currency, price) {
    console.log(`I have purchased ${this.color} - ${this.company} car for ${currency}${price}`);
}

const newFunc = purchaseCar.myBind(car1);
console.log(newFunc("$", 5000));