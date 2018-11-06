const { isNode } = require("./print-ast-outline");

const createTraverser = getCode => {
  const traverser = (node, visitor, indent = 0) => {
    console.log(`${" ".repeat(indent)}enter: ${node.type} '${getCode(node)}'`);

    if (!(node.type in visitor)) {
      // 適用する関数がなければ何もしない
      return;
      // エラーで落とす
      // console.error(`unknown type ${node.type}`);
      // console.log(JSON.stringify(node, null, " ".repeat(2)));
      // process.exit(1);
    }

    const result = {};
    Object.keys(node).forEach(key => {
      const val = node[key];
      if (!isNode(val)) {
        return;
      }

      if (Array.isArray(val)) {
        result[key] = val.map(n => traverser(n, visitor, indent + 2));
      } else {
        result[key] = traverser(val, visitor, indent + 2);
      }
    });

    console.log(`${" ".repeat(indent)}exit : ${node.type} '${getCode(node)}'`);

    return visitor[node.type](node, result, indent);
  };

  return traverser;
};

module.exports = {
  createTraverser
};
