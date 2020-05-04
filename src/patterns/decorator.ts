abstract class Beverage { // abstract
 description: string = "Unknown beverage";

 getDescription(): string {
   return this.description;
 }

 abstract cost(): number;
}

abstract class CondimentDecorator extends Beverage {
 abstract getDescription(): string;
}

export class HouseBlend extends Beverage {
 constructor() {
   super();
   this.description = 'HouseBlend';
 }

 cost(): number {
   return .89;
 }
}

export class DarkRoast extends Beverage {
 constructor() {
   super();
   this.description = 'DarkRoast';
 }

 cost(): number {
   return .99;
 }
}

export class Espresso extends Beverage {
 constructor() {
   super();
   this.description = 'Espresso';
 }

 cost(): number {
   return 1.99;
 }
}

export class Milk extends CondimentDecorator {
 beverage: Beverage;

 constructor(_beverage: Beverage) {
   super();
   this.beverage = _beverage;

 }

 getDescription(): string {
   return `${this.beverage.getDescription()}, Milk`;
 }

 cost(): number {
   return .10 + this.beverage.cost();
 }
}

export class Mocha extends CondimentDecorator {
 beverage: Beverage;

 constructor(_beverage: Beverage) {
   super();
   this.beverage = _beverage;

 }

 getDescription(): string {
   return `${this.beverage.getDescription()}, Mocha`;

 }

 cost(): number {
   return .20 + this.beverage.cost();
 }
}

export class Whip extends CondimentDecorator {
 beverage: Beverage;

 constructor(_beverage: Beverage) {
   super();
   this.beverage = _beverage;

 }

 getDescription(): string {
   return `${this.beverage.getDescription()}, Whip`;

 }

 cost(): number {
   return .15 + this.beverage.cost();
 }
}

const beverage1 = new Espresso();
console.log(beverage1.getDescription(), '-', beverage1.cost());

let beverage2 = new DarkRoast();
beverage2 = new Mocha(beverage2);
beverage2 = new Milk(beverage2);
beverage2 = new Milk(beverage2);
beverage2 = new Whip(beverage2);
console.log(beverage2.getDescription(), '-', beverage2.cost());
