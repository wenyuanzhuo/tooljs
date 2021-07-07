
// var node4 = {left: null, right: null, val: 4 }; 
// var node5 = {left: null, right: null, val: 5 }; 
// var node6 = {left: null, right: null, val: 6 }; 
// var node7 = {left: null, right: null, val: 7 };
// var node3 = {left: node6, right: node7, val: 3 };
// var node2 = {left: node4, right: node5, val: 2 };
// var node1 = {left: node2, right: node3, val: 1 };

var node1 = {
    val: 1,
    left: {
        val: 2,
        left: { val:4, left: null, right: null, },
        right: { val: 5, left: null, right: null, }
    },
    right: {
        val: 3,
        left: { val:6, left: null, right: null, },
        right: { val: 7, left: null, right: null, }
    }
}

var node2 = {
    val: 1,
    left: {
        val: 2,
        left: { val:3, left: null, right: null, },
        right: { val: 4, left: null, right: null, }
    },
    right: {
        val: 5,
        left: { val:6, left: null, right: null, },
        right: { val:7, left: null, right: null, }
    }
}

function preorderTraversal(root) {
	if (!root) {
		return;
	}
	var left = root.left;
	var right = root.right;
	preorderTraversal(left);
	preorderTraversal(right);
	console.log(root.val);
}

// preorderTraversal(node1); 

let chain = null

function preorderTraversal2(root) {
	if (!root) {
		return;
	}
	var left = root.left;
	var right = root.right;
	preorderTraversal2(right);
	preorderTraversal2(left);
	// console.log(root.val);
    root.right = chain
    root.left = null
    chain = root
    console.log(chain)
}

preorderTraversal2(node2); 