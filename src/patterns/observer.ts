interface Subject {
    registerObserver(o: Observer): void;
    removeObserver(o: Observer): void;
    notifyObservers(): void;
}

interface Observer {
    update(data: any): void;
}

export class ConcreteSubject implements Subject {
    private observers: Array<Observer>;
  	private data: any;

  	constructor() {
  		this.observers = new Array();
  	}

    registerObserver(o: Observer): void {
        this.observers.push(o);
    }

    removeObserver(o: Observer): void {
        this.observers.forEach((observer: Observer, i: number) => {
            if (observer === o) {
                this.observers.splice(i, 1);
                return;
            }
        });
    }

    notifyObservers(): void {
        console.log('---notify');
        this.observers.forEach((observer: Observer) => {
            observer.update(this.data);
        })
    }

    dataChanged(): void {
        this.notifyObservers();
    }

    setData(data: any): void {
        this.data = data;
        this.dataChanged();
    }
}

export class ConcreteObserver1 implements Observer {
    _subjectData: Subject;
    _data: any;

    constructor(subjectData: Subject) {
        this._subjectData = subjectData;
        subjectData.registerObserver(this);
    }

    update(data: any): void {
        this._data = data;
        console.log('Data updated: ', this._data);
    }
}
