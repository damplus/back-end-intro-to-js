//ES6 class syntax
class Counter {
    //destructuring assignment and default values
    constructor({initialValue = 0, increment = 1, name}) {
        this.count = initialValue;
        this.incrementAmount = increment;
        this.name = name;
    }

    increment() {
        this.count += this.incrementAmount;
    }

    decrement() {
        this.count -= this.incrementAmount;
    }

    isGreaterThan(number) {
        return this.count > number;
    }

    toString() {
        //destructuring assignment.  Equivalent to const name = this.name; const count = this.count;
        const {name, count} = this;
        //string interpolation
        return `Counter named ${name} with value ${count}`;
    }
}

function incrementAllCounters(counters) {
    return counters.forEach(counter => counter.increment());
}

function printCounter(counter) {
    console.log(counter.toString());
}

//const defines a constant
const counterConfigs = [
    {
        initialValue: 2,
        name: "Krombopulos"
    },
    {
        initialValue: 0,
        increment: 2,
        name: "Bird Person"
    }
];

//Using a lambda in map
const counters = counterConfigs.map(counterConfig => new Counter(counterConfig));

incrementAllCounters(counters);

const countersAboveTwo = counters.filter(counter => counter.isGreaterThan(2));

countersAboveTwo.forEach(printCounter);
