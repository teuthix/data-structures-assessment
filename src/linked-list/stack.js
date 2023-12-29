/**
 * Implement a Stack using nothing more than a LinkedList.
 */

const LinkedList = require("../linked-list/linkedList");

class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  push(value) {
    // insert at head
    this.linkedList.insertAtHead(value);
    return this;
  }

  pop() {
    // remove from head
    return this.linkedList.remove(
      (node) => node.value === this.linkedList.head.value
    );
  }

  peek() {
    // return head
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

module.exports = Stack;
