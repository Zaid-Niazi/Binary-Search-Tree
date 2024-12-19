//node class
class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
// Tree class
class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    sorter(array);
    return builder(array);
  }
  insert(value) {
    traverse(value, this.root);
  }
  deleteItem(value) {
    deleteTraverse(value, this.root);
  }

  find(val) {
    return traverse(this.root, val);
    function traverse(root, val) {
      if (root === null) return null;
      if (root.data === val) {
        return root;
      } else {
        if (val < root.data) {
          return traverse(root.left, val);
        } else {
          return traverse(root.right, val);
        }
      }
    }
  }

  levelOrder(callback) {
    if (callback === undefined) throw console.error("Callback required");
    if (this.root === null) return;
    let queue = [this.root];
    while (queue.length > 0) {
      let root = queue.shift();
      callback(root);
      if (root.left !== null) queue.push(root.left);
      if (root.right !== null) queue.push(root.right);
    }
  }
  inOrder(callback) {
    trav(this.root);
    function trav(root) {
      if (root === null) return;
      trav(root.left);
      callback(root);

      trav(root.right);
    }
  }
  preOrder(callback) {
    trav(this.root);
    function trav(root) {
      if (root === null) return;
      callback(root);
      trav(root.left);
      trav(root.right);
    }
  }
  postOrder(callback) {
    trav(this.root);
    function trav(root) {
      if (root === null) return;
      trav(root.left);
      trav(root.right);
      callback(root);
    }
  }

  height(node) {
    let root = this.find(node);
    function trav(node) {
      if (node === null) return -1;

      let left = trav(node.left);
      let right = trav(node.right);
      return 1 + Math.max(left, right);
    }
    return trav(root);
  }

  isBalanced() {
    let root = this.root;
    console.log(checkBalance(root) !== -1);
    return checkBalance(root) !== -1;
    function checkBalance(node) {
      if (node === null) return 0;
      let left = checkBalance(node.left);
      if (left === -1) return -1;
      let right = checkBalance(node.right);
      if (right === -1) return -1;

      if (Math.abs(left - right) > 1) return -1;
      return 1 + Math.max(left, right);
    }
  }

  reBalance() {
    if (this.isBalanced() === false) {
      this.root = this.buildTree(array);
    }
  }

  depth(input) {
    let root = this.root;

    let counter = 0;
    function findVal(root) {
      if (root === null) return null;
      if (root.data === input) return root;
      else {
        if (input < root.data) {
          counter++;
          return findVal(root.left);
        } else if (input > root.data) {
          counter++;
          return findVal(root.right);
        }
      }
    }
    findVal(root);
    return counter;
  }
}

// methods for tree

function sorter(array) {
  array.sort(function (a, b) {
    return a - b;
  });

  for (let i = 0; i < array.length; i++) {
    if (array[i] === array[i + 1]) {
      array.splice(i, 1);
    }
  }

  return array;
}

function builder(arr) {
  if (arr.length === 0) return null;
  let mid = Math.floor(arr.length / 2);

  let root = new Node(arr[mid]);

  let left = arr.slice(0, mid);
  let right = arr.slice(mid + 1);
  root.left = builder(left);
  root.right = builder(right);
  return root;
}

function traverse(val, root) {
  if (root.data > val) {
    if (root.left !== null) {
      traverse(val, root.left);
    } else {
      root.left = new Node(val);
      array.push(val);
    }
  }
  if (root.data < val) {
    if (root.right !== null) {
      traverse(val, root.right);
    } else {
      root.right = new Node(val);
      array.push(val);
    }
  }
}
function deleteTraverse(val, root) {
  let currentParent = root;
  traversal(currentParent, root);
  function traversal(currentParent, root) {
    if (root.data !== val) {
      if (val < root.data) {
        traversal(root, root.left);
      } else if (val > root.data) {
        traversal(root, root.right);
      }
    } else if (root.data === val) {
      //leaf
      if (root.left === null && root.right === null) {
        if (currentParent.left !== null && currentParent.left.data === val) {
          currentParent.left = null;
        } else if (
          currentParent.right !== null &&
          currentParent.right.data === val
        ) {
          currentParent.right = null;
        }
      }
      // node with one child
      if (root.left === null || root.right === null) {
        if (root.left !== null) {
          if (currentParent.left.data === root.data) {
            currentParent.left = root.left;
          } else if (currentParent.right.data === root.data) {
            currentParent.right = root.left;
          }
        } else if (root.right !== null) {
          if (currentParent.left.data === root.data) {
            currentParent.left = root.right;
          } else if (currentParent.right.data === root.data) {
            currentParent.right = root.right;
          }
        }

        // node with Two children
      } else if (root.left !== null && root.right !== null) {
        let replacer;
        let replacerParent;
        recursion(root, root.right);
        function recursion(currentParent, root) {
          if (root.left === null) {
            replacerParent = currentParent;

            replacer = root.data;

            deleteTraverse(replacer, replacerParent);
            return root;
          }
          recursion(root, root.left);
        }
        if (currentParent !== root) {
          if (currentParent.left.data === root.data) {
            currentParent.left.data = replacer;
          } else if (currentParent.right.data === root.data) {
            currentParent.right.data = replacer;
          }
        } else {
          root.data = replacer;
        }
      }
    }
  }
}

// printer
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

//

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = new Tree(array);
// test.preOrder((x) => console.log(x));
// test.postOrder((x) => console.log(x));
// test.levelOrder((x) => console.log(x));
test.insert(2);
test.insert(2.2);
test.isBalanced();
test.reBalance();
prettyPrint(test.root);
