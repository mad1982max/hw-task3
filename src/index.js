'use strict';

//Task3*******--ITERATION--***************

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


//TASK_4.1*****--REDUCE--***********************
//arr.reduce((prev, cur, i, arr) => {}, init)

let arr = [1, 9, 300, 4, 6];

function reduce(arr, callback, initValue = 0) {
    let collector = initValue;

    for (let i = 0; i < arr.length; i++) {
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
console.log('sumOfValues', sumOfValues); //sumOfValues 320

const maxOfValues = reduce(arr, max);
console.log('maxOfValues', maxOfValues); //maxOfValues 300

//TASK_4.2*****--MAP--***********************
//arr.map((item, i, arr) => {}[,thisArg])

const arr2 = [120, 230, 740, 650, 380];

function map(arr, callback) {
    let resultArr= [];
    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        resultArr[i] = callback(current, i, arr);
    }
    return resultArr;
}

//callback1
function buildObj(item, i) {
    return {[`month_${i+1}`]: item};
}

const objArr = map(arr2, buildObj);
console.log(objArr); //[ {month_1: 120}, {month_2: 230}, ....]

//callback2
function doubled(item) {
    return item * 2;
}

const doubledArr = map(arr2, doubled);
console.log(doubledArr); // [ 240, 460, 1480, 1300, 760 ]


//TASK_4.3****BUBLE SORTING***********************

let arr3 = [1000, 9, 1, 8, 25, 7, 3, 15, 400];

function bubleSort (array, callback) {
    let sortedArr = array.slice();
    return callback(sortedArr);
}

//callback
function sortingF(arr) {
    let length = arr.length;

    while (length) {

        for (let i = 0; i < arr.length; i++) {
            let bigger;

            if (arr[i] > arr[i+1]) {
                bigger = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = bigger;
            }
        }
        length--;
    }
    return arr;

}

console.time('bulbSort');
const sortedArr = bubleSort(arr3, sortingF);
console.timeEnd('bulbSort');

console.log(arr3); //old arr [ 1000, 9, 1, 8, 25, 7, 3, 15, 400 ]
console.log(sortedArr); //after sorting [ 1, 3, 7, 8, 9, 15, 25, 400, 1000 ]