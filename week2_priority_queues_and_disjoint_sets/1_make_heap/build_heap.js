/* eslint-disable class-methods-use-this */
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');


class Queue {
  constructor() {
    this.queue = [];
    this.size = 0;
    this.swaps = [];
  }

  // CORE Operation
  siftUp(i) {
    const parent = this.queue[(i - 1) / 2];
    const node = this.queue[i];

    while (i >= 0 && this.queue[parent]) {
      if (parent >= node) break;
      this.queue[i] = parent;
      this.queue[(i - 1) / 2] = node;
    }
  }

  // Helper
  leftChild(i) {
    return 2 * i + 1;
  }

  // Helper
  rightChild(i) {
    return 2 * i + 2;
  }

  // Helper
  swap(i, j) {
    const tmp = this.queue[i];
    this.queue[i] = this.queue[j];
    this.queue[j] = tmp;
  }

  // CORE Operation
  siftDown(i) {
    let minIndex = i;

    const l = this.leftChild(i);
    if (l <= this.size && this.queue[minIndex] > this.queue[l]) {
      minIndex = l;
    }

    const r = this.rightChild(i);
    if (r <= this.size && this.queue[minIndex] > this.queue[r]) {
      minIndex = r;
    }

    if (i !== minIndex) {
      this.swap(i, minIndex);
      this.swaps.push([i, minIndex]);
      this.siftDown(minIndex);
    }
  }

  // CORE Operation
  extractMin() {}

  // CORE Operation
  changePriority(i, prio) {
    // Change the priority. In this case it is just the value of the node.
    this.queue[i] = prio;
    // Call Sift Up OR Down depending on either priority increases or decreases.
    this.siftDown(i);
  }

  // CORE Operation
  remove() {}

  // CORE Operation
  buildHeap(array) {
    this.queue = array;
    this.size = array.length;

    const len = Math.floor(this.size / 2) - 1;

    for (let i = len; i >= 0; i -= 1) {
      this.siftDown(i);
    }

    return this.swaps;
  }

  // Helper
  generateOutput() {
    console.log(this.swaps.length);
    this.swaps.forEach((s) => console.log(s.join(' ')));
  }
}

// Catch input from coursera and avoid the first line
const q = new Queue();
rl.once('line', () => {
  rl.once('line', (line) => {
    const data = line.toString().split(' ').map(Number);
    q.buildHeap(data);
    q.generateOutput();
    process.exit();
  });
});


// module.exports = findMismatch;
