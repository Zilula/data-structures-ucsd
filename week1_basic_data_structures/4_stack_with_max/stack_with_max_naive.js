const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');

class Stack {
  constructor() {
    this.list = [];
  }

  push(ele) {
    const data = {};
    const head = this.top();

    if (this.isEmpty()) {
      data.value = ele;
      data.max = ele;
    } else {
      data.value = ele;
      data.max = head.max > ele ? head.max : ele;
    }

    return this.list.push(data);
  }

  pop() {
    this.list.pop();
  }

  max() {
    return this.top().max;
  }

  isEmpty() {
    return this.list.length === 0;
  }

  top() {
    return this.list[this.list.length - 1];
  }

  print() {
    return this.list;
  }
}


const stack = new Stack();


rl.on('line', (line) => {
  // DO SOMETHING
  const args = line.split(' ');
  if (args[0] === 'push') {
    stack.push(args[1]);
  }
  if (args[0] === 'pop') {
    stack.pop();
  }
  if (args[0] === 'max') {
    console.log(stack.max());
  }
});


module.exports = Stack;
