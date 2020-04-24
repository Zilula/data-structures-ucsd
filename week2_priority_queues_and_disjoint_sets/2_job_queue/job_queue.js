
/* eslint-disable class-methods-use-this */
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');

class Queue {
  constructor(arr) {
    this.queue = arr || [];
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
  getMin() {
    return this.queue[0];
  }

  // CORE Operation
  extractMin() {
    // Make the root the old last node
    const oldLeaf = this.queue.splice(this.queue.length - 1, 1);
    this.queue[0] = oldLeaf;
    this.siftDown(0);
  }

  // CORE Operation
  changePriority(i, p) {
    // Change the priority. In this case it is just the value of the node.
    this.queue[i] = p;
    // Call Sift Up OR Down depending on either priority increases or decreases.
    this.siftDown(i);
  }

  // CORE Operation
  remove() {}

  // CORE Operation
  buildHeap(array) {
    this.queue = array || this.queue;
    this.size = array.length;

    const len = Math.floor(this.size / 2) - 1;

    for (let i = len; i >= 0; i -= 1) {
      this.siftDown(i);
    }

    return this.swaps;
  }
}

const processJobs = (threads, jobs) => {
  const res = [];
  const q = new Queue(Array.from({ length: threads }, (t, i) => ({ time: 0, threadIndex: i })));


  for (let i = 0; i < jobs.length; i += 1) {
    // Get first job (getMin)
    const { threadIndex, time } = q.getMin();
    q.queue.shift();
    // Console log the output
    res.push([threadIndex, time]);
    // Change priority to remove (remove)
    q.changePriority(q.queue.length, { threadIndex, time: time + jobs[i] });
  }
  return res;
};


rl.once('line', (a) => {
  rl.once('line', (line) => {
    const args = a.split(' ');
    const jobs = line.toString().split(' ').map(Number);
    const res = processJobs(args[0], jobs);

    res.forEach((x) => console.log(x.join(' ')));
    process.exit();
  });
});
