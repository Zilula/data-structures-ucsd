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

  delete() {}

  find() {}

  inOrder(node) {
    const left = this.list[node.left];
    const right = this.list[node.right];
    if (!node) return null;
    if (left) this.inOrder(left);
    console.log(node.key);
    if (right) this.inOrder(right);
  }

  postOrder(node) {
    const left = this.list[node.left];
    const right = this.list[node.right];
    if (!node) return null;
    if (left) this.postOrder(left);
    if (right) this.postOrder(right);
    console.log(node.key);
  }

  preOrder(node) {
    const left = this.list[node.left];
    const right = this.list[node.right];
    if (!node) return null;
    console.log(node.key);
    if (left) this.preOrder(left);
    if (right) this.preOrder(right);
  }
}


const T = new BinarySearchTree();


rl.once('line', (n) => {
  const numNodes = Number(n);
  rl.on('line', (l) => {
    const [key, left, right] = l.split(' ');
    const node = new Node(key, left, right);

    T.insert(node);
    if (numNodes === T.list.length) {
      T.inOrder(T.root);
      T.preOrder(T.root);
      T.postOrder(T.root);
    }
  });
});


module.exports = BinarySearchTree;
