interface State {
    insertQuarter(): void;
    ejectQuarter(): void;
    turnCrank(): void;
    dispense(): void;
}

class WinnerState implements State {
    gumballMachine: GumballMachine;

    constructor(gumballMachine: GumballMachine ) {
        this.gumballMachine = gumballMachine;
    }

    insertQuarter(): void {
        console.log("Please wait, we're already giving you a Gumball");
    }

    ejectQuarter(): void {
        console.log("Please wait, we're already giving you a Gumball");
    }

    turnCrank() {
        console.log("Turning again doesn't get you another gumball!");
    }

    dispense(): void {
        console.log("YOU'RE A WINNER! You get two gumballs for your quarter");
        this.gumballMachine.releaseBall();
        if (this.gumballMachine.getCount() == 0) {
            this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
        } else {
            this.gumballMachine.releaseBall();
            if (this.gumballMachine.getCount() > 0) {
                this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
            } else {
                console.log("Oops, out of gumballs!");
                this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
            }
        }
    }

    toString(): string {
        return "despensing two gumballs for your quarter, because YOU'RE A WINNER!";
    }
}

class GumballMachine {
    soldOutState: State;
    noQuarterState: State;
    hasQuarterState: State;
    soldState: State;
    winnerState: State;

    state: State = this.soldOutState;
    count: number = 0;

    constructor(numberGumballs: number) {
        this.soldOutState = new SoldOutState(this);
        this.noQuarterState = new NoQuarterState(this);
        this.hasQuarterState = new HasQuarterState(this);
        this.soldState = new SoldState(this);
        this.winnerState = new WinnerState(this);

        this.count = numberGumballs;
        if (numberGumballs > 0) {
            this.state = this.noQuarterState;
        }
    }

    insertQuarter(): void {
        this.state.insertQuarter();
    }

    ejectQuarter(): void {
        this.state.ejectQuarter();
    }

    turnCrank(): void {
        this.state.turnCrank();
        this.state.dispense();
    }

    setState(state: State ): void {
        this.state = state;
    }

    releaseBall(): void {
        console.log("A gumball comes rolling out the slot...");
        if (this.count != 0) {
            this.count = this.count - 1;
        }
    }

    getCount(): number {
        return this.count;
    }

    refill(count: number): void {
        this.count = count;
        this.state = this.noQuarterState;
    }

    getState(): State {
        return this.state;
    }

    getSoldOutState(): State {
        return this.soldOutState;
    }

    getNoQuarterState(): State {
        return this.noQuarterState;
    }

    getHasQuarterState(): State {
        return this.hasQuarterState;
    }

    getSoldState(): State {
        return this.soldState;
    }

    getWinnerState(): State {
        return this.winnerState;
    }

    toString(): string {
        const result = [];
        result.push("\nMighty Gumball, Inc.");
        result.push("\nJava-enabled Standing Gumball Model #2004");
        result.push("\nInventory: " + this.count + " gumball");
        if (this.count != 1) {
            result.push("s");
        }
        result.push("\n");
        result.push("Machine is " + this.state + "\n");
        return result.join('\n');
    }
}

class HasQuarterState implements State {
    randomWinner = Math.floor(Math.random() * Math.floor(1));;
    gumballMachine: GumballMachine;

    constructor(gumballMachine: GumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    insertQuarter(): void {
        console.log("You can't insert another quarter");
    }

    ejectQuarter(): void {
        console.log("Quarter returned");
        this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    }

    turnCrank(): void {
        console.log("You turned...");
        const winner = Math.floor(Math.random() * Math.floor(10));
        if ((winner === 0) && (this.gumballMachine.getCount() > 1)) {
            this.gumballMachine.setState(this.gumballMachine.getWinnerState());
        } else {
            this.gumballMachine.setState(this.gumballMachine.getSoldState());
        }
    }

    dispense(): void {
        console.log("No gumball dispensed");
    }

    toString(): string {
        return "waiting for turn of crank";
    }
}

class NoQuarterState implements State {
    gumballMachine: GumballMachine;

    constructor(gumballMachine: GumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    insertQuarter(): void {
        console.log("You inserted a quarter");
        this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
    }

    ejectQuarter(): void {
        console.log("You haven't inserted a quarter");
    }

    turnCrank(): void {
        console.log("You turned, but there's no quarter");
    }

    dispense(): void {
        console.log("You need to pay first");
    }

    toString(): string {
        return "waiting for quarter";
    }
}

class SoldOutState implements State {
    gumballMachine: GumballMachine;

    constructor(gumballMachine: GumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    insertQuarter(): void {
        console.log("You can't insert a quarter, the machine is sold out");
    }

    ejectQuarter(): void {
        console.log("You can't eject, you haven't inserted a quarter yet");
    }

    turnCrank(): void {
        console.log("You turned, but there are no gumballs");
    }

    dispense(): void {
        console.log("No gumball dispensed");
    }

    toString(): string {
        return "sold out";
    }
}

class SoldState implements State {
    gumballMachine: GumballMachine;

    constructor(gumballMachine: GumballMachine ) {
        this.gumballMachine = gumballMachine;
    }

    insertQuarter(): void {
        console.log("Please wait, we're already giving you a gumball");
    }

    ejectQuarter(): void {
        console.log("Sorry, you already turned the crank");
    }

    turnCrank(): void {
        console.log("Turning twice doesn't get you another gumball!");
    }

    dispense(): void {
        this.gumballMachine.releaseBall();
        if (this.gumballMachine.getCount() > 0) {
            this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
        } else {
            console.log("Oops, out of gumballs!");
            this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
        }
    }

    toString(): string {
        return "dispensing a gumball";
    }
}

export class GumballMachineTestDrive {
    gumballMachine: GumballMachine = new GumballMachine(10);

    constructor() {
        console.log(this.gumballMachine);
        this.gumballMachine.insertQuarter();
        this.gumballMachine.turnCrank();
        this.gumballMachine.insertQuarter();
        this.gumballMachine.turnCrank();

        console.log(this.gumballMachine);
        this.gumballMachine.insertQuarter();
        this.gumballMachine.turnCrank();
        this.gumballMachine.insertQuarter();
        this.gumballMachine.turnCrank();

        console.log(this.gumballMachine);
        this.gumballMachine.insertQuarter();
        this.gumballMachine.turnCrank();
        this.gumballMachine.insertQuarter();
        this.gumballMachine.turnCrank();

        console.log(this.gumballMachine);
        this.gumballMachine.insertQuarter();
        this.gumballMachine.turnCrank();
        this.gumballMachine.insertQuarter();
        this.gumballMachine.turnCrank();

        console.log(this.gumballMachine);
        this.gumballMachine.insertQuarter();
        this.gumballMachine.turnCrank();
        this.gumballMachine.insertQuarter();
        this.gumballMachine.turnCrank();

        console.log(this.gumballMachine);
    }
}
