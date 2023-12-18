// Flatten an object using recursion
const flattenObject = (input, keyName = '') => {
    let result = {};
    for (let key in input) {
        const newKey = keyName ? `${keyName}_${key}` : key;
        if (typeof input[key] === "object" && !Array.isArray(input[key])) {
            result = { ...result, ...flattenObject(input[key], newKey) };
        } else {
            result[newKey] = input[key];
        }
    }
    return result;
}


const input = {
    name: 'Mansi',
    age: 25,
    department: {
        name: 'Customer Experience',
        section: 'Technical',
        branch: {
            name: 'Bangalore',
            timezone: 'IST'
        }
    },
    company: {
        name: 'SAP',
        customers: ['Ford', 'Nestle']
    },
    skills: ['javascript', 'node.js', 'html']
}

console.log(flattenObject(input, 'output'));