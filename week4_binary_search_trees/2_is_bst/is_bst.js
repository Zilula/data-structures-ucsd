/* eslint-disable consistent-return */
/* eslint-disable max-classes-per-file */
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');

class Node {
  constructor(key, left, right) {
    this.key = key || null;
    this.left = left || null;
    this.right = right || null;
  }
}

class BinarySearchTree {
  constructor() {
    this.list = [];
    this.root = null;
  }


  insert(node) {
    if (!this.root) {
      this.root = node;
    }
    this.list.push(node);
  }

  checkBS(node) {
    const left = this.list[node.left];
    const right = this.list[node.right];
    if (!node) return 'CORRECT';

    if (left && left.key > node.key) {
      return 'INCORRECT';
    }
    if (right && right.key < node.key) {
      return 'INCORRECT';
    }
    if (left) this.inOrder(left);
    if (right) this.inOrder(right);
  }

  inOrder(node) {
    const left = this.list[node.left];
    const right = this.list[node.right];
    if (!node) return false;
    if (left) this.inOrder(left);
    if (right) this.inOrder(right);
  }
}


const T = new BinarySearchTree();


rl.once('line', (n) => {
  const numNodes = Number(n.toString());
  if (numNodes === 0) {
    console.log('CORRECT');
    process.exit();
  }
  rl.on('line', (l) => {
    const [key, left, right] = l.split(' ');
    const node = new Node(key, left === '-1' ? null : left, right === '-1' ? null : right);

    T.insert(node);

    if (numNodes === T.list.length) {
      const res = T.checkBS(T.root);
      res ? console.log(res) : console.log('CORRECT');
      process.exit();
    }
  });
});


module.exports = BinarySearchTree;
