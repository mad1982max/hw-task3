'use strict';

//Task3***************************************

const iterableObject = {
    firstField: 1,
    secondField: 2
};

iterableObject[Symbol.iterator] = function() {
    let keys = Object.keys(this);
    let index = 0;
    let self = this;

    return {
        next() {
            return {
                done: index >= keys.length,
                value: self[keys[index ++]]
            }
        }
    }

};

iterableObject.thirdField = 3;
iterableObject.fourthField = 4;

for (let o of iterableObject) {
    console.log(o); //1, 2, 3, 4
}

console.log([...iterableObject]); //[1, 2, 3, 4]

let iterator = iterableObject[Symbol.iterator]();

console.log(iterator.next()); //{ done: false, value: 1 }
console.log(iterator.next()); //{ done: false, value: 2 }
console.log(iterator.next()); //{ done: false, value: 3 }
console.log(iterator.next()); //{ done: false, value: 4 }
console.log(iterator.next()); //{ done: true, value: undefined }


//Task4*****свой reduce***********************
//arr.reduce((prev, cur, i, arr) => {}, init)

let arr = [1, 9, 300, 4, 6];

function reduce(arr, callback, initValue = 0) {
    let i, collector = initValue;

    for (i = 0; i < arr.length; i++) {
        let currentElem = arr[i];
        collector = callback(collector, currentElem, i, arr);
    }
    return collector;
}

//first callback
function sum(result, current) {
    return result += current;
}

//second callback
function max(result, current) {
    return current >= result? current: result
}

const sumOfValues = reduce(arr, sum);
console.log(sumOfValues); //320

const maxOfValues = reduce(arr, max);
console.log(maxOfValues); //300