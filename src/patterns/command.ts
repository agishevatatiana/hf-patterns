interface Command {
    execute(): void;
    undo(): void;
    redo(): void;
}

// Null Object method, sometimes listed as a design pattern
class NoCommand implements Command {
    execute(): void { }
    undo(): void { }
    redo(): void { }
}

export class RemoteControlWithUndo {
    onCommands: Command[];
    offCommands: Command[];
    undoCommands: Command[];
    redoCommands: Command[];
    private noCommand = new NoCommand();

    constructor() {
        this.onCommands = new Array(2);
        this.offCommands = new Array(2);
        for(let i = 0; i < 3; i++) {
            this.onCommands[i] = this.noCommand;
            this.offCommands[i] = this.noCommand;
        }
        this.undoCommands = [];
        this.redoCommands = [];
    }

    setCommand(slot: number, onCommand: Command, offCommand: Command) {
        this.onCommands[slot] = onCommand;
        this.offCommands[slot] = offCommand;
    }

    onButtonWasPushed(slot: number): void {
        this.onCommands[slot].execute();
        this.undoCommands.push(this.onCommands[slot]);
    }

    offButtonWasPushed(slot: number): void {
        this.offCommands[slot].execute();
        this.undoCommands.push(this.offCommands[slot]);
    }

    undoButtonWasPushed(): void | string {
        if (!this.undoCommands.length) {
            return this.noCommand.undo();
        }
        const currentCommand = this.undoCommands.pop();
        this.redoCommands.push(currentCommand);
        currentCommand.undo();
    }

    redoButtonWasPushed(): void {
        if (!this.redoCommands.length) {
            return this.noCommand.redo();
        }
        const currentCommand = this.redoCommands.pop();
        this.undoCommands.push(currentCommand);
        currentCommand.redo();
    }
}

export class CeilingFan {
    static readonly HIGH = 3;
    static readonly MEDIUM = 2;
    static readonly LOW = 1;
    static readonly OFF = 0;

    location: string;
    speed: number;

    constructor(location: string) {
        this.location = location;
        this.speed = CeilingFan.OFF;
    }

    high(): void {
        this.speed = CeilingFan.HIGH;
        // code to set fan to high
    }

    medium(): void {
        this.speed = CeilingFan.MEDIUM;
        // code to set fan to medium
    }

    low(): void {
        this.speed = CeilingFan.LOW;
        // code to set fan to low
    }

    off(): void {
        this.speed = CeilingFan.OFF;
        // code to turn fan off
    }

    getSpeed(): number {
        return this.speed;
    }
}

abstract class ConcreteCommand implements Command {
    ceilingFan: CeilingFan;
    prevSpeed: number;
    currentSpeed: number;

    constructor(ceilingFan: CeilingFan) {
        this.ceilingFan = ceilingFan;
    }

    abstract execute(): void;

    private changeSpeed(speed: number): void {
        if (speed == CeilingFan.HIGH) {
            this.ceilingFan.high();
        } else if (speed == CeilingFan.MEDIUM) {
            this.ceilingFan.medium();
        } else if (speed == CeilingFan.LOW) {
            this.ceilingFan.low();
        } else if (speed == CeilingFan.OFF) {
            this.ceilingFan.off();
        }
    }

    undo(): void {
        this.currentSpeed = this.ceilingFan.getSpeed();
        this.changeSpeed(this.prevSpeed);
    }

    redo(): void {
        this.changeSpeed(this.currentSpeed);
    }
}

export class CeilingFanHighCommand extends ConcreteCommand {

    constructor(ceilingFan: CeilingFan) {
        super(ceilingFan);
    }

    execute(): void {
        super.prevSpeed = this.ceilingFan.getSpeed();
        this.ceilingFan.high();
    }
}

export class CeilingFanLowCommand extends ConcreteCommand {

    constructor(ceilingFan: CeilingFan) {
        super(ceilingFan);
    }

    execute(): void {
        super.prevSpeed = this.ceilingFan.getSpeed();
        this.ceilingFan.low();
    }
}

export class CeilingFanMediumCommand extends ConcreteCommand {

    constructor(ceilingFan: CeilingFan) {
        super(ceilingFan);
    }

    execute(): void {
        super.prevSpeed = this.ceilingFan.getSpeed();
        this.ceilingFan.medium();
    }
}

export class CeilingFanOffCommand extends ConcreteCommand {

    constructor(ceilingFan: CeilingFan) {
        super(ceilingFan);
    }

    execute(): void {
        super.prevSpeed = this.ceilingFan.getSpeed();
        this.ceilingFan.off();
    }
}