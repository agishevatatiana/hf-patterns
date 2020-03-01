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
