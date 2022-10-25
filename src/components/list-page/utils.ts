export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedList<T> {
  append: (item: T) => void;
  prepend: (item: T) => void;
  removeHead: (item: T) => void;
  removeTail: (item: T) => void;
  insertAt: (item: T, index: number) => void;
  removeFrom: (index: number) => void;
  getSize: () => number;
  toArray: () => T[];
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor(items?: T[]) {
    this.head = null;
    this.size = 0;

    //Можно лучше: Лучше создать какой-то отдельный метод для этого.
    if (items) {
      for (let item of items) {
        this.append(item);
      }
    }
  }

  append(item: T) {
    const node = new Node(item);
    let currentent;

    if (!this.head) {
      this.head = node;
    } else {
      currentent = this.head;
      while (currentent.next) {
        currentent = currentent.next;
      }

      currentent.next = node;
    }
    this.size++;
  }

  prepend(item: T) {
    const node = new Node(item);
    if (this.head !== null) {
      node.next = this.head;
    }
    this.head = node;
    this.size++;
  }

  removeHead() {
    if (this.head) {
      this.head = this.head?.next;
      this.size--;
    } else {
      return;
    }
  }

  removeTail() {
    let current = this.head;
    let previous = current;
    if (this.size === 1) {
      this.head = null;
      this.size--;
      return;
    }
    while (current?.next) {
      previous = current;
      current = current.next;
    }
    if (previous !== null) {
      previous.next = null;
      this.size--;
    }
  }

  insertAt(item: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const node = new Node(item);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let current = this.head;
        let currentIndex = 0;

        // перебрать элементы в списке до нужной позиции
        while (currentIndex < index) {
          currentIndex++;
          if (current?.next && currentIndex !== index) {
            current = current?.next;
          }
        }

        // добавить элемент
        if (current) {
          node.next = current.next;
          current.next = node;
        }
      }
      this.size++;
    }
  }

  removeFrom(index: number) {
    if (index >= 0 && index < this.size && this.head) {
      let current = this.head;
      let previous = current;
      let currIndex = 0;

      if (index === 0) {
        this.head = current.next;
      } else {
        while (currIndex < index) {
          currIndex++
          if (current.next) {
            previous = current;
            current = current.next;
          }
        }
        previous.next = current.next;
      }
      this.size--;
    } else {
      return;
    }
  }

  getHead() {
    return this.head;
  }

  getSize() {
    return this.size;
  }

  toArray(): Array<T> {
    let current = this.head;
    let array: Array<T> = [];
    while (current) {
      array.push(current.value);
      current = current.next;
    }
    return array;
  }
}


export const randomStringArr = (min = 4, max = 6) => {
  const limit = Math.floor(Math.random() * (max + 1 - min)) + min;
  const arr = [];
  for (let i = 0; i < limit; i++) {
    arr.push(Math.floor(Math.random() * 100).toString());
  }
  return arr;
}