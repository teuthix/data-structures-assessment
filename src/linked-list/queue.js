const LinkedList = require("./linkedList");

/**
 * Implement a Queue using nothing more than a LinkedList.
 */

class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  enqueue(value) {
    this.linkedList.insert(value);
  }

  dequeue() {
    //     console.log(this.linkedList.head.value);
    return this.linkedList.remove(
      (node) => node.value === this.linkedList.head.value
    );
  }

  peek() {
    if (this.linkedList.length > 0) {
      return this.linkedList.head.value;
    }
  }

  isEmpty() {
    if (this.linkedList.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Queue;
