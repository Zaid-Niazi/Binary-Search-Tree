class Node {
  constructor(data, left = null, right = null) {
    this.data = data; // Changed 'value' to 'data'
    this.left = left;
    this.right = right;
  }
}

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
}

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
    }
  }
  if (root.data < val) {
    if (root.right !== null) {
      traverse(val, root.right);
    } else {
      root.right = new Node(val);
    }
  }
}

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

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = new Tree(array);
test.insert(2);

prettyPrint(test.root);
