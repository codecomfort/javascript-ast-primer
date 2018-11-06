const { transform } = require("@babel/core");

const src = "1 + 2";

const plugin = ({ types: t }) => {
  visitor: {
    BynaryExpression: nodePath => {
      if (nodePath.node.operator !== '*') {
        const newAst = t.binaryExpression(
          '*',
          nodePath.node.left,
          nodePath.node.right
         )
      nodePath.replaceWith(newAst)
      }
      nodePath;
    };
  }
};

const { code } = transform(src, { plugins: [plugin] });
console.log(code);

// エラーになるが原因不明
// 一通りやりきる過程でわかるようになるかも。いったん保留。
