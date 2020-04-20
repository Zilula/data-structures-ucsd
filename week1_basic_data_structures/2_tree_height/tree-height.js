class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// // depth first search
// class Tree {
//   constructor() {
//     this.root = null
//   }
//     insertNode(root, newNode) {
//       // new node
//       // if we have an empty node
//       if(!this.root) return this.root = newNode

//       // if the value is less then root value
//       if(root.data < newNode.data) {
//         // if no left child make the new node the new left child
//         if(!root.left) {
//           return root.left = newNode
//         } 
//         return this.insertNode(this.root.left)
//       }

//       // if the value is greater then the root
//       else {
//         // if no right child => make new node the new right child
//         if(!root.right) return root.right = newNode;
//         return this.insertNode(this.root.right)
//       }
//       return this.root
//     }


//     getHeight(node, h) {
//       let height = h || 0;
//       console.log(node)
//       if(node.left) {
//           height += 1
//           return this.getHeight(node.left, height)
//       } 
//       if (node.right) {
//           height += 1
//           return this.getHeight(node.right, height)
//       }
//       return height
//     }

//     peek() {
//         return this.root
//     }
// }


class BinarySearchTree {
  constructor() {
    //initially root is null

    this.root = null;
  }

  insertNumberNode(data, left = null, right = null) {
    //creating a Node
    //data we pass will act as individual parent Node
    //left and right are subtrees
    let Node = {
      data,
      left,
      right
    };
    //suppose currentNumberNode as a parent node
    //current Num Node value decides position of next value
    //if it goes to left subtree or right subtree
    let currentNumberNode;

    if (!this.root) {
      //if its not a root make it one by passing a Node
      this.root = Node;
    } else {
      //and if its a root now, assign it to currentNumberNode
      currentNumberNode = this.root;
      while (currentNumberNode) {
        //if data is smaller than cuurent data, send it in left subtree
        if (data < currentNumberNode.data) {
          //if current num node don't have Node properties
          //we will assign it node properties
          if (!currentNumberNode.left) {
            currentNumberNode.left = Node;
            break;
          } else {
            //if it has node properties and it is sent by root to left
            //we will make it a left node because it is smaller than root node
            currentNumberNode = currentNumberNode.left;
          }
          //if data is larger than cuurent data, send it in right subtree
        } else if (data > currentNumberNode.data) {
          //if current num node don't have Node properties
          //we will assign it node properties
          if (!currentNumberNode.right) {
            currentNumberNode.right = Node;
            break;
          } else {
            //if it has node properties and it is sent by root to right
            //we will make it a right node because it is larger than root node
            currentNumberNode = currentNumberNode.right;
          }
        } else {
          console.log("Try Different Value");
          break;
        }
      }
    }
  }
  getHeight(node, h) {
      let height = h || 0;
      // console.log(node)
      if(node.left) {
          height += 1
          return this.getHeight(node.left, height)
      } 
      if (node.right) {
          height += 1
          return this.getHeight(node.right, height)
      }
      return height
    }
    peek() {
      return this.root
    }
}

// const n2 = {
//   data: 8,
//   left: 4
// }
// const n1 = {
//   data: 8,
//   left: n2
// }
// const root = {
//   data: 10,
//   left: n1
// }

const tree = new BinarySearchTree

const addedValues = [1, 20, 10, 8].map(num => {
  return tree.insertNumberNode(num)
})
const result = tree.getHeight(tree.peek())
console.log(result)


// const result = tree.getHeight(root)
// console.log(result)