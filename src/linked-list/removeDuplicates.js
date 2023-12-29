/**
 * Remove duplicate values, if any, from a sorted linked list.
 *
 * The algorithm should be O(n) time complexity, therefore it cannot use `find()`.
 *
 * @param sortedLinkedList
 *  a possibly empty link list with all values in lexical order.
 *
 * @returns {LinkedList}
 *  the original linked list with any duplicate values removed.
 */

function removeDuplicates(sortedLinkedList) {
  // TODO: implement an algorithm to remove duplicate values from a sorted linked list.
  // move it all to a map
  // then move it back into a linked list
  const noDupes = new Map();
  if (sortedLinkedList.length === 0) {
    return [];
  } else if (sortedLinkedList.length === 1) {
    return sortedLinkedList;
  }

  let current = sortedLinkedList.head;

  while (current && current.next) {
    if (current.value === current.next.value) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return sortedLinkedList;
}

module.exports = removeDuplicates;
