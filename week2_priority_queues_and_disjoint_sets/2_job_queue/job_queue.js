/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
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
    // Gets first availiable Thread
    const { threadIndex, time } = q.getMin();

    // If the time required to process is 0, it can process it instantly effectivly doing 2 OPs in 1
    if (jobs[i] === 0) {
      res.push([threadIndex, time]);
      // Change priority to remove (remove)
      q.changePriority(q.queue.length, { threadIndex, time: time + jobs[i] });
      i += 1;
    }

    // Remove Thread from Queue
    q.queue.shift();

    // Push result to array
    res.push([threadIndex, time]);

    // Change priority to remove (remove)
    q.changePriority(q.queue.length, { threadIndex, time: time + jobs[i] });
  }
  return res;
};


rl.once('line', (a) => {
  rl.once('line', (line) => {
    const threadCount = a.toString().split(' ').map(Number)[0];
    const jobs = line.toString().split(' ').map(Number);
    const res = processJobs(threadCount, jobs);

    res.forEach((x) => console.log(x.join(' ')));
    process.exit();
  });
});


// eslint-disable-next-line max-classes-per-file
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   terminal: false,
// });

// process.stdin.setEncoding('utf8');

// rl.once('line', (a) => {
//   const threadCount = a.toString().split(' ').map(Number)[0];

//   rl.once('line', (line) => {
//     const jobs = line.toString().split(' ').map(Number);
//     const result = assignJobs(jobs, threadCount);

//     for (const res of result) {
//       console.log(res.join(' '));
//     }

//     process.exit();
//   });
// });

// function assignJobs(jobs = [], threadCount = 0) {
//   const result = [];
//   const nextFreeTime = new Heap(Array.from({ length: threadCount }, (v, k) => new Element(k, 0)));

//   for (const job of jobs) {
//     const { element: nextWorker, priority: time } = nextFreeTime.getMin();

//     result.push([nextWorker, time]);
//     nextFreeTime.changePriority(0, time + job);
//   }

//   return result;
// }

// class Element {
//   constructor(element, priority) {
//     this.element = element;
//     this.priority = priority;
//   }
// }

// class Heap {
//   constructor(items) {
//     this.items = items;
//     this.size = items.length - 1;
//   }

//   leftChild(i) {
//     return 2 * i + 1;
//   }

//   rightChild(i) {
//     return 2 * i + 2;
//   }

//   swap(i, j) {
//     const tmp = this.items[i];
//     this.items[i] = this.items[j];
//     this.items[j] = tmp;
//   }

//   siftDown(i) {
//     let minIndex = i;

//     const l = this.leftChild(i);
//     if (l <= this.size && this.items[minIndex].priority >= this.items[l].priority) {
//       if (this.items[minIndex].priority === this.items[l].priority) {
//         minIndex = this.items[minIndex].element < this.items[l].element ? minIndex : l;
//       } else {
//         minIndex = l;
//       }
//     }

//     const r = this.rightChild(i);
//     if (r <= this.size && this.items[minIndex].priority >= this.items[r].priority) {
//       if (this.items[minIndex].priority === this.items[r].priority) {
//         minIndex = this.items[minIndex].element < this.items[r].element ? minIndex : r;
//       } else {
//         minIndex = r;
//       }
//     }

//     if (i !== minIndex) {
//       this.swap(i, minIndex);
//       this.siftDown(minIndex);
//     }
//   }

//   changePriority(i, p) {
//     this.items[i].priority = p;
//     this.siftDown(i);
//   }

//   getMin() {
//     return this.items[0];
//   }
// }

// module.exports = assignJobs;
