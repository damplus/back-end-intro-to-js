class Counter {
    constructor(initialValue = 0) {
        this.count = initialValue;
    }

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }

    isGreaterThan(number) {
        return this.count > number;
    }
}

function incrementAllCounters(counters) {
    return counters.forEach(counter => counter.increment());
}

const counters = [new Counter(2), new Counter()];

incrementAllCounters(counters);

const countersAboveTwo = counters.filter(counter => counter.isGreaterThan(2));

console.log(countersAboveTwo);

