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
    this.nodes = [];
  }


  insert(node) {
    if (!this.root) {
      this.root = node;
    }
    this.list.push(node);
  }

  checkBS() {
    // const left = this.list[node.left];
    // const right = this.list[node.right];


    // // Check to see if the binary search properties are maintained

    // // Checks to see if the left child is greater then than then parent node
    // // and returns 'INCORRECT' because it violates the BST property
    // if (left && left.key > node.key) {
    //   return 'INCORRECT';
    // }
    // // Checks to see if the right child is less than the parent node
    // // and returns 'INCORRECT' because it violates the BST property
    // if (right && right.key < node.key) {
    //   return 'INCORRECT';
    // }

    // if (left) this.checkBS(left);
    // if (right) this.checkBS(right);


    // return 'CORRECT';


    // Call inorder traversal
    this.inOrder(this.root);


    for (let i = 0; i < this.nodes.length; i += 1) {
      if (this.nodes[i] < this.nodes[i - 1]) {
        return 'INCORRECT';
      }
    }
    return 'CORRECT';
  }

  inOrder(node) {
    const left = this.list[node.left];
    const right = this.list[node.right];
    if (!node) return false;
    if (left) this.inOrder(left);
    this.nodes.push(node.key);
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
    const node = new Node(Number(key), left === '-1' ? null : Number(left), right === '-1' ? null : Number(right));

    T.insert(node);

    if (numNodes === T.list.length) {
      const res = T.checkBS(T.root);
      console.log(res);
      process.exit();
    }
  });
});


module.exports = BinarySearchTree;
