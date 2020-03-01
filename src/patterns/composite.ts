abstract class MenuComponent {
    add(menuComponent: MenuComponent): void {}
    remove(menuComponent: MenuComponent): void {}
    getChild(i: number): MenuComponent {
        return null;
    }
    getName(): string {
        return '';
    }
    getDescription(): string {
        return '';
    }
    getPrice(): number {
        return 0;
    }
    isVegetarian(): boolean {
        return false;
    }
    print(): void {}
}

class Menu extends MenuComponent {
    menuComponents = [];
    name: string;
    description: string;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }

    add(menuComponent: MenuComponent): void {
        this.menuComponents.push(menuComponent);
    }

    remove(menuComponent: MenuComponent): void {
        this.menuComponents = this.menuComponents.filter((el, i) => el !== menuComponent);
    }

    getChild( i: number): MenuComponent  {
        return this.menuComponents[i];
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    print(): void {
        console.log("\n" + this.getName());
        console.log(", " + this.getDescription());
        console.log("---------------------");

        this.menuComponents.forEach((menuComponent) => {
            menuComponent.print();
        });
    }
}

class MenuItem extends MenuComponent {
    name: string;
    description: string;
    vegetarian: boolean;
    price: number;

    constructor(name: string, description: string, vegetarian: boolean, price: number) {
        super();
        this.name = name;
        this.description = description;
        this.vegetarian = vegetarian;
        this.price = price;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getPrice(): number {
        return this.price;
    }

    isVegetarian(): boolean {
        return this.vegetarian;
    }

    print(): void {
        console.log("  " + this.getName() + '\n');
        if (this.isVegetarian()) {
            console.log("(v)\n");
        }
        console.log(", " + this.getPrice() + '\n');
        console.log("     -- " + this.getDescription());
    }
}


class Waitress {
    allMenus: MenuComponent;

    constructor(allMenus: MenuComponent) {
        this.allMenus = allMenus;
    }

    printMenu(): void {
        this.allMenus.print();
    }
}

export class MenuTestDrive {
    pancakeHouseMenu: MenuComponent = new Menu("PANCAKE HOUSE MENU", "Breakfast");
    dinerMenu: MenuComponent = new Menu("DINER MENU", "Lunch");
    cafeMenu: MenuComponent = new Menu("CAFE MENU", "Dinner");
    dessertMenu: MenuComponent = new Menu("DESSERT MENU", "Dessert of course!");
    coffeeMenu: MenuComponent = new Menu("COFFEE MENU", "Stuff to go with your afternoon coffee");

    allMenus: MenuComponent = new Menu("ALL MENUS", "All menus combined");

    constructor() {
        this.allMenus.add(this.pancakeHouseMenu);
        this.allMenus.add(this.dinerMenu);
        this.allMenus.add(this.cafeMenu);

        this.pancakeHouseMenu.add(new MenuItem(
            "K&B's Pancake Breakfast",
            "Pancakes with scrambled eggs, and toast",
            true,
            2.99));
        this.pancakeHouseMenu.add(new MenuItem(
            "Regular Pancake Breakfast",
            "Pancakes with fried eggs, sausage",
            false,
            2.99));
        this.pancakeHouseMenu.add(new MenuItem(
            "Blueberry Pancakes",
            "Pancakes made with fresh blueberries, and blueberry syrup",
            true,
            3.49));
        this.pancakeHouseMenu.add(new MenuItem(
            "Waffles",
            "Waffles, with your choice of blueberries or strawberries",
            true,
            3.59));


        this.dinerMenu.add(new MenuItem(
            "Vegetarian BLT",
            "(Fakin') Bacon with lettuce & tomato on whole wheat",
            true,
            2.99));
        this.dinerMenu.add(new MenuItem(
            "BLT",
            "Bacon with lettuce & tomato on whole wheat",
            false,
            2.99));
        this.dinerMenu.add(new MenuItem(
            "Soup of the day",
            "A bowl of the soup of the day, with a side of potato salad",
            false,
            3.29));
        this.dinerMenu.add(new MenuItem(
            "Hotdog",
            "A hot dog, with saurkraut, relish, onions, topped with cheese",
            false,
            3.05));
        this.dinerMenu.add(new MenuItem(
            "Steamed Veggies and Brown Rice",
            "Steamed vegetables over brown rice",
            true,
            3.99));
        this.dinerMenu.add(new MenuItem(
            "Pasta",
            "Spaghetti with Marinara Sauce, and a slice of sourdough bread",
            true,
            3.89));

        this.dinerMenu.add(this.dessertMenu);

        this.dessertMenu.add(new MenuItem(
            "Apple Pie",
            "Apple pie with a flakey crust, topped with vanilla icecream",
            true,
            1.59));
        this.dessertMenu.add(new MenuItem(
            "Cheesecake",
            "Creamy New York cheesecake, with a chocolate graham crust",
            true,
            1.99));
        this.dessertMenu.add(new MenuItem(
            "Sorbet",
            "A scoop of raspberry and a scoop of lime",
            true,
            1.89));
        this.cafeMenu.add(new MenuItem(
            "Veggie Burger and Air Fries",
            "Veggie burger on a whole wheat bun, lettuce, tomato, and fries",
            true,
            3.99));
        this.cafeMenu.add(new MenuItem(
            "Soup of the day",
            "A cup of the soup of the day, with a side salad",
            false,
            3.69));
        this.cafeMenu.add(new MenuItem(
            "Burrito",
            "A large burrito, with whole pinto beans, salsa, guacamole",
            true,
            4.29));

        this.cafeMenu.add(this.coffeeMenu);
        this.coffeeMenu.add(new MenuItem(
            "Coffee Cake",
            "Crumbly cake topped with cinnamon and walnuts",
            true,
            1.59));
        this.coffeeMenu.add(new MenuItem(
            "Bagel",
            "Flavors include sesame, poppyseed, cinnamon raisin, pumpkin",
            false,
            0.69));
        this.coffeeMenu.add(new MenuItem(
            "Biscotti",
            "Three almond or hazelnut biscotti cookies",
            true,
            0.89));

        const waitress: Waitress = new Waitress(this.allMenus);
        waitress.printMenu();

    }
}
