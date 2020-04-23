const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');

// Basic Queue with Min-Heap features
class Queue {
  constructor() {
    this.queue = [];
    this.size = 0;
  }

  getMax() {}

  Insert() {}

  siftUp(i) {
    const parent = this.queue[(i - 1) / 2];
    const node = this.queue[i];

    while (i >= 0 && this.queue[parent]) {
      if (parent >= node) break;
      this.queue[i] = parent;
      this.queue[(i - 1) / 2] = node;
    }
  }

  siftDown(i) {
    let max = null;
    const leftIndex = (2 * i) + 1;
    const rightIndex = (2 * i) + 2;

    const newNode = this.queue[leftIndex] > this.queue[rightIndex] ? max = leftIndex : max = rightIndex;
    this.queue[max] = this.queue[i];
    this.queue[i] = newNode;
  }

  extractMin() {}

  changePriority() {}

  remove() {}

  buildHeap(array) {
    this.size = array.length;

    for (let i = 0; i < this.size / 2; i += 1) {
      const node = array[i];
      this.siftDown(node);
    }
  }
}


// Catch input from coursera and avoid the first line stating the number of integers that will be in the array

const q = new Queue();
let c = 0;
rl.on('line', (line) => {
  c += 1;
  if (c > 0) {
    const data = line.split(' ');
    console.log(q.buildHeap(data));
  }
  process.exit();
});


// module.exports = findMismatch;
