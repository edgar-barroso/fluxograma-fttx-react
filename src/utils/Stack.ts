export class Stack<T> {
    private items: T[];
    private maxSize: number;

    constructor(maxSize: number = 10) {
        this.items = [];
        this.maxSize = maxSize;
    }

    push(element: T): void {
        if (this.items.length === this.maxSize) {
            this.items.shift(); // Remove o elemento mais antigo
        }
        this.items.push(element);
    }

    pop(): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }
        return this.items.pop();
    }

    peek(): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    print(): void {
        console.log(this.items.toString());
    }
}
