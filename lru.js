class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();

    this.head = new Node(-1, -1);
    this.tail = new Node(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  insert(node) {
    let after = this.head.next;
    node.prev = this.head;
    node.next = after;
    this.head.next = node;
    after.prev = node;
  }

  delete(node) {
    let before = node.prev;
    let after = node.next;
    before.next = after;
    after.prev = before;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    let node = this.map.get(key);
    this.delete(node);
    this.insert(node);
    return node.value;
  }

  put(key, value) {
  let removedKey = null;

  if (this.map.has(key)) {
    let node = this.map.get(key);
    node.value = value;
    this.delete(node);
    this.insert(node);
  } else {
    if (this.map.size === this.capacity) {
      let lru = this.tail.prev;
      removedKey = lru.key;
      this.delete(lru);
      this.map.delete(lru.key);
    }
    let node = new Node(key, value);
    this.insert(node);
    this.map.set(key, node);
  }

  return removedKey;
}



  getCacheState() {
    let result = [];
    let curr = this.head.next;
    while (curr !== this.tail) {
      result.push({ key: curr.key, value: curr.value });
      curr = curr.next;
    }
    return result;
  }
}
