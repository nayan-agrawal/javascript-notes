// Flatten an array upto nth depth using recursion
function flattenArray(nestedArray) {
    const flat = [];
    const handleFlat = (arr) => {
        let counter = 0;
        while (counter < arr.length) {
            const val = arr[counter];
            if (Array.isArray(val)) {
                handleFlat(val);
            } else {
                flat.push(val);
            }
            counter++;
        }
    }
    handleFlat(nestedArray);
    return flat;
}

const a = [1, 2, 3, [[[4]], 5], 6, [[[7]]]];
console.log(flattenArray(a));