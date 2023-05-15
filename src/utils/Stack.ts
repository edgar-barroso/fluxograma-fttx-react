export class Stack<T> {
    private items: T[];
  
    constructor() {
      this.items = [];
    }
  
    push(element: T): void {
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
  