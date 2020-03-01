import { TestStrategy } from './patterns/strategy';
import { ConcreteSubject, ConcreteObserver1 } from './patterns/observer';
import { Espresso, DarkRoast, Milk, Mocha, Whip } from './patterns/decorator';
import { ConcreteCreator1, ConcreteCreator2 } from './patterns/factory-method';
import { Singleton } from './patterns/singleton';
import {
    CeilingFan,
    CeilingFanHighCommand,
    CeilingFanLowCommand,
    CeilingFanMediumCommand,
    CeilingFanOffCommand,
    RemoteControlWithUndo
} from './patterns/command';
import { WildTurkey, MallardDuck, TurkeyAdapter, testDuck } from "./patterns/adapter";
import { MenuTestDrive } from './patterns/composite';
import { Proxy, RealSubject, Subject } from './patterns/proxy';
import { GumballMachineTestDrive } from './patterns/state';

console.error('-----test Strategy------\n');
const testStrategy = new TestStrategy();
testStrategy.getReportBtnClick('admin');
testStrategy.getReportBtnClick('member');
// changeReport
testStrategy.changeReport('member');

console.error('-----test observer------\n');
const subjectData = new ConcreteSubject();
const showUpdatedData = new ConcreteObserver1(subjectData);
subjectData.setData('data1'); // in console 'Data updated: data1'
subjectData.setData('data2'); // in console 'Data updated: data2'
subjectData.removeObserver(showUpdatedData);
subjectData.setData('data3'); // nothing in console

// test Decorator
console.error('-----test Decorator------\n');
const beverage1 = new Espresso();
console.log(beverage1.getDescription(), '-', beverage1.cost());

let beverage2 = new DarkRoast();
beverage2 = new Mocha(beverage2);
beverage2 = new Milk(beverage2);
beverage2 = new Milk(beverage2);
beverage2 = new Whip(beverage2);
console.log(beverage2.getDescription(), '-', beverage2.cost());

// test Decorator
console.error('-----test Factory Method------\n');
let creator1 = new ConcreteCreator1();
let creator2 = new ConcreteCreator2();

let product = creator1.factoryMethod('Type1');
product.show();
console.log('--get the same product from second creator--');
product = creator2.factoryMethod('Type1');
product.show();


// test Singleton
console.error('-----test Singleton------\n');
let singleton1 = Singleton.getInstance();
let singleton2 = Singleton.getInstance();
singleton1.addition(1,2);
singleton2.addition(3,4);
console.log('first result: ', singleton1.getSumm());
console.log('check second result is equal first result: ', singleton2.getSumm());


// test Command
console.error('-----test Command------\n');
const remoteControl = new RemoteControlWithUndo();
const ceilingFan = new CeilingFan("Living Room");

const ceilingFanLow = new CeilingFanLowCommand(ceilingFan);
const ceilingFanMedium = new CeilingFanMediumCommand(ceilingFan);
const ceilingFanHigh = new CeilingFanHighCommand(ceilingFan);
const ceilingFanOff = new CeilingFanOffCommand(ceilingFan);

remoteControl.setCommand(0, ceilingFanLow, ceilingFanOff);
remoteControl.setCommand(1, ceilingFanMedium, ceilingFanOff);
remoteControl.setCommand(2, ceilingFanHigh, ceilingFanOff);

remoteControl.onButtonWasPushed(0);
console.log('onButtonWasPushed - 1: ', ceilingFan.getSpeed()); // 1
remoteControl.onButtonWasPushed(2);
console.log('onButtonWasPushed - 3: ', ceilingFan.getSpeed()); // 3
remoteControl.undoButtonWasPushed();
console.log('undoButtonWasPushed: ', ceilingFan.getSpeed()); // 1
remoteControl.redoButtonWasPushed();
console.log('redoButtonWasPushed: ', ceilingFan.getSpeed()); // 3
remoteControl.offButtonWasPushed(0);
console.log('offButtonWasPushed: ', ceilingFan.getSpeed()); // 0


// test Adapter
console.error('-----test Adapter------\n');
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

// test Composite
console.error('-----test Composite------\n');
const test = new MenuTestDrive();

// test State
console.error('-----test Composite------\n');
const test1 = new GumballMachineTestDrive();

// test Proxy
console.error('-----test Proxy------\n');
function clientCode(subject: Subject) {
    subject.request();
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new Proxy(realSubject);
clientCode(proxy);



