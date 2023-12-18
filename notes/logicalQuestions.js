// Write a recursive method which iterates over the object and stores all the names in an array.

function getNames(inputObject) {
    const output = [];

    const getIndividualNames = (obj) => {
        // get the name of the parent
        if (typeof obj === "object" && obj.hasOwnProperty("name")) {
            const val = obj["name"];
            output.push(val);
        }
        if (typeof obj === "object" && obj.hasOwnProperty("children")) {
            const childrens = obj["children"];
            if (childrens.length > 0) {
                for (let child of childrens) {
                    getIndividualNames(child);
                }
            }
        }
    }
    getIndividualNames(inputObject);
    return output;
}

const input = {
    "id": 1,
    "name": "Parent",
    "children": [
        {
            "id": 2,
            "name": "Child 1",
            "children": [
                {
                    "id": 5,
                    "name": "Grandchild 1.1",
                    "children": []
                },
                {
                    "id": 6,
                    "name": "Grandchild 1.2",
                    "children": []
                }
            ]
        },
        {
            "id": 3,
            "name": "Child 2",
            "children": []
        },
        {
            "id": 4,
            "name": "Child 3",
            "children": [
                {
                    "id": 7,
                    "name": "Grandchild 3.1",
                    "children": []
                },
                {
                    "id": 7,
                    "name": "Grandchild 3.2",
                    "children": []
                }
            ]
        }
    ]
};
console.log(getNames(input));