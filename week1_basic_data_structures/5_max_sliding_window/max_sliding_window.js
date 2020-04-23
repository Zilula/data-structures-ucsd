const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');


function getMax(min, max) {
  return 'Success';
}
rl.once('line', (line) => {
  console.log(getMax(line));
  process.exit();
});


module.exports = getMax;





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
    return this.list.push(ele);
  }

  pop() {
    return this.list.pop();
  }

  max() {
    return this.list.sort()[this.list.length - 1];
  }

  isEmpty() {
    return this.list.length === 0;
  }

  print() {
    return this.list;
  }
}


const stack = new Stack();

let data = '';
rl.on('line', (line) => {
  // DO SOMETHING
  data += `-${line}`;
});
console.log(data);
const x = data.split('-');

x.forEach((line) => {
  const args = line.split(' ');
  if (args[0] === 'push') {
    stack.push(args[1]);
  } else if (args[0] === 'pop') {
    stack.pop();
  } else if (args[0] === 'max') {
    console.log(stack.max());
  }
});


module.exports = Stack;
