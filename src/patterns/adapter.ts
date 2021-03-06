interface Turkey {
    Gobble(): string;
    Fly(): string;
}

interface Duck {
    Quack(): string;
    Fly(): string;
}

class DuckAdapter implements Turkey {
    duck: Duck;

    constructor(duck: Duck) {
        this.duck = duck;
    }

    Gobble(): string {
        return this.duck.Quack();
    }

    Fly() {
        return this.duck.Fly();
    }
}

export class MallardDuck implements Duck {
    constructor() {}

    Quack(): string {
        return "Quack";
    }

    Fly(): string {
        return "I'm flying";
    }
}

export class TurkeyAdapter implements Duck {
    turkey: Turkey;

    constructor(turkey: Turkey) {
        this.turkey = turkey;
    }

    Quack(): string {
        return this.turkey.Gobble();
    }

    Fly(): string {
        let sb = [];

        for (let i = 0; i < 5; i++) {
            sb.push(this.turkey.Fly());
        }
        return sb.join('\n');
    }
}

export class WildTurkey implements Turkey {
    constructor() {}

    Gobble(): string {
        return "Gooble, gooble";
    }

    Fly(): string {
        return "I'm flying a short distance";
    }
}

export const testDuck = (duck: Duck) => {
    console.log(duck.Quack());
    console.log(duck.Fly());
};

const duck = new MallardDuck();
const turkey = new WildTurkey();
const turkeyAdapter = new TurkeyAdapter(turkey);
console.log('The Turkey Says: ');
console.log(turkey.Gobble());
console.log(turkey.Fly());
console.log('----');

console.log('The Duck Says: ');
testDuck(duck);
console.log('----');

console.log('The turkeyAdapter Says: ');
testDuck(turkeyAdapter);
console.log('----');