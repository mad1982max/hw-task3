'use strict';

const cars = require('./data/cars'); // IMMUTABLE. DON'T CHANGE cars
const customers = require('./data/customers'); // IMMUTABLE. DON'T CHANGE customers
const dealerships = require('./data/dealerships'); // IMMUTABLE. DON'T CHANGE dealerships
const orders = require('./data/orders'); // IMMUTABLE. DON'T CHANGE orders

//subtask1***************************************

const subtask1 = () => {
    return dealerships.reduce((collector, dealer) => {
        let carArrEachDealer = cars.filter(car => car.dealershipId === dealer.dealershipId);

        const dealerObj = {};
        dealerObj.dealershipId = dealer.dealershipId;
        dealerObj.name = dealer.name;
        dealerObj.state = dealer.state;

        if(carArrEachDealer.length === 0) {
            dealerObj.cars = [];
        } else {
            dealerObj.cars = reBuildResultArr(carArrEachDealer);
        }

        collector.push(dealerObj);

        return collector;
    }, []);

//-----------------------------------------------

    function findUniqVal(arr, key) { //Unique values by key
        const set = new Set();
        arr.forEach(val => set.add(val[key]));
        return [...set];
    }
//-----------------------------------------------

    function reBuildResultArr(carArr) {
        const carsResult = [];
        const makers = findUniqVal(carArr, 'make'); //all makers

        makers.forEach(maker => {

            const arrOfMakers = carArr.filter(car => car.make === maker);

            const grouped = arrOfMakers.reduce((colect, car) => {
                colect[car.model] = colect[car.model] || [];

                if(colect[car.model].indexOf(car.displayName) === -1) { //check for repeats
                    colect[car.model].push(car.displayName);
                }

                return colect;
            }, {});

            const modelsObj = Object.keys(grouped).map(key => {
                return {model: key, displayName: grouped[key]}
            });

            const obj = {make: maker, models: []};
            obj.models.push(modelsObj);
            carsResult.push(obj);
        });
        return carsResult;
    }

};

console.time('subtask #1');
const result1 = subtask1();
console.log(result1);
console.timeEnd('subtask #1');
console.log('subtask #1 result: ', JSON.stringify(result1[0], null, 2), JSON.stringify(result1[result1.length - 1], null, 2));
