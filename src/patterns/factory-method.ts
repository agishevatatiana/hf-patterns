abstract class Product {
    feature1: string;
    feature2: string;

    show(): void {
        console.log(`Feature1 of product from current creator: ${this.feature1}`, '\n' );
        console.log(`Feature2 of product from current creator: ${this.feature2}`, '\n' );
    }
}

abstract class Creator {
    product: Product;

    abstract factoryMethod(type: string): Product; // factory method

    showGeneratedProduct(type: string): void {
        this.product = this.factoryMethod(type);
    }
}

class Creator1ProductType1 extends Product {

    constructor() {
        super();
        this.feature1 = 'ProductType1 from Creator1 - f1';
        this.feature2 = 'ProductType1 from Creator1 - f2';
    }

}

class Creator1ProductType2 extends Product {

    constructor() {
        super();
        this.feature1 = 'ProductType2 from Creator1 - f1';
        this.feature2 = 'ProductType2 from Creator1 - f2';
    }

}

class Creator2ProductType1 extends Product {

    constructor() {
        super();
        this.feature1 = 'ProductType1 from Creator2 - f1';
        this.feature2 = 'ProductType1 from Creator2 - f2';
    }

}

class Creator2ProductType2 extends Product {

    constructor() {
        super();
        this.feature1 = 'ProductType2 from Creator2 - f1';
        this.feature2 = 'ProductType2 from Creator2 - f2';
    }

}

export class ConcreteCreator1 extends Creator {
    factoryMethod(type: string) : Product {
        switch(type){
            case 'Type1':  return new Creator1ProductType1();
            case 'Type2':  return new Creator1ProductType2();
            default: return new Creator1ProductType1();
        }
    }
}

export class ConcreteCreator2 extends Creator {
    factoryMethod(type: string) : Product {
        switch(type){
            case 'Type1':  return new Creator2ProductType1();
            case 'Type2':  return new Creator2ProductType2();
            default: return new Creator2ProductType2();
        }
    }
}

let creator1 = new ConcreteCreator1();
let creator2 = new ConcreteCreator2();

let product = creator1.factoryMethod('Type1');
product.show();
console.log('--get the same product from second creator--');
product = creator2.factoryMethod('Type1');
product.show();

