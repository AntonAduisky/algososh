export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  peak: () => T | null;
  getElements: () => T[];
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  clear = (): void => {
    this.container = [];
  };

  getElements = () => {
    return this.container;
  };

  peak = (): T | null => {
    const len = this.getSize();
    if (len > 0) {
      return this.container[len - 1];
    }
    return null;
  };

  getSize = () => this.container.length;
}