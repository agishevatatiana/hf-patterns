export class Singleton {

    private static instance: Singleton;
    private summ: number;

    private constructor() { }

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    public addition(first: number, second: number) {
        this.summ = first + second;
    }

    public getSumm() {
        return this.summ;
    }
}

let singleton1 = Singleton.getInstance();
let singleton2 = Singleton.getInstance();
singleton1.addition(1,2);
singleton2.addition(3,4);
console.log('first result: ', singleton1.getSumm());
console.log('check second result is equal first result: ', singleton2.getSumm());