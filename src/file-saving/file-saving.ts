const fs = require('fs');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface MenuI {
    [key: string]: {
        description: string,
        handler: Function
    }
}

class Menu {

    constructor(menu: MenuI) {
        const keys = Object.keys(menu || {});
        keys.forEach((key) => {
            const menuEl = menu[key];
            return this.showEl(key, menuEl.description);
        });
        this.handleEl(menu);
    }

    static async readFile(): Promise<void> {
        try {
            const readFile = await fs.readFileSync('src/file-saving/data.txt', { flag: 'a+' });
            console.log('file data: \t ', readFile.toString());
        } catch (e) {
            console.log('error on open: ', e);
        }
    }

    static addData(): void {
        rl.question("What is your name? ", (name: string) => {
            rl.question("When was you born? ", (birthday: string) => {
                rl.question("Where do you live? ", async (country: string) => {
                    const readFile = await fs.readFileSync('src/file-saving/data.txt', { flag: 'a+' });
                    const stringEx = readFile.toString();
                    const data = `${stringEx}\n name: ${name}, \n birthday: ${birthday}, \n country: ${country}, \n*********`;
                    try {

                        const writeToFile = await fs.writeFileSync(
                            'src/file-saving/data.txt',
                            Buffer.from(data),
                            { flag: 'w+' }
                            );
                        console.log('Data added successfully, to see file data press [>]');
                    } catch (e) {
                        console.log('write error: ', e);
                    }
                });
            });
        });
    }

    static exit(): void {
        rl.on('close', () => {
            process.exit(0)
        });
        rl.close();
    }

    private showEl(key: string, description: string): void {
        console.log(`Press [${key}] to ${description}`);
    }

    private handleEl(menu: MenuI): void {
        process.stdin.on('keypress', (keyboardKey) => {
            if (menu[keyboardKey]) {
                return menu[keyboardKey].handler();
            }
        });
    }
}

const menuStr = {
    '>': {
        description: 'see file data',
        handler: Menu.readFile
    },
    '<': {
        description: 'add data to file',
        handler: Menu.addData
    },
    '-': {
        description: 'exit',
        handler: Menu.exit
    }
};

const newMenu = new Menu(menuStr);
