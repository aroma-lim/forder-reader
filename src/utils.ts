export interface TreeNode {
  name: string;
  children: TreeNode[];
  selected?: boolean;
}

function createNode(path: string[], tree: TreeNode[]): void {
  const name = path.shift();
  const idx = tree.findIndex((e: TreeNode) => {
    return e.name === name;
  });
  if (idx < 0) {
    tree.push({
      name: name ?? "",
      children: [],
    });
    if (path.length !== 0) {
      createNode(path, tree[tree.length - 1].children);
    }
  } else {
    createNode(path, tree[idx].children);
  }
}

function sortNodesAndChildren(nodes: TreeNode[]) {
  nodes.sort((a, b) => a.name.localeCompare(b.name));
  nodes.sort((a, b) => {
    if (a.children.length > 0 && b.children.length === 0) return -1;
    else return 1;
  });

  nodes.forEach((node) => {
    if (node.children) {
      sortNodesAndChildren(node.children);
    }
  });
}

export default function pathToTree(json: string): TreeNode[] {
  const tree: TreeNode[] = [];
  const data: string[] = [];

  JSON.parse(json, function (key) {
    if (key !== "") data.push(key);
  });

  for (let i = 0; i < data.length; i++) {
    const path: string = data[i];
    const split: string[] = path.split(".");
    createNode(split, tree);
  }

  sortNodesAndChildren(tree);
  return tree;
}

export function validateJSON(file: string) {
  const data = JSON.parse(file);
  Object.keys(data).forEach((key) => {
    if (
      /^[A-Za-z.]*$/.test(key) === false ||
      key.includes("..") ||
      key[0] === "." ||
      key[key.length - 1] === "." ||
      key === ""
    ) {
      throw new Error();
    }
  });

  return data;
}
