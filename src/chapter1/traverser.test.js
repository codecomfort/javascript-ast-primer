const babylon = require("babylon");
const { createTraverser } = require("./traverser");

const code = process.argv.slice(2).join();
const getCode = node => code.substr(node.start, node.end - node.start);
// 各 Node のメンバーは以下を参照
// [babylon/spec.md at master · babel/babylon](https://github.com/babel/babylon/blob/master/ast/spec.md)
const visitor = {
  File: (fNode, result, indent) => {
    console.log(`${" ".repeat(indent)}visitor.File executed`);
    return "file"
  },
  Program: (pgNode, result, indent) => {
    console.log(`${" ".repeat(indent)}visitor.Program executed`);
    return "program"
  },
  ExpressionStatement: (esNode, result, indent) => {
    console.log(`${" ".repeat(indent)}visitor.ExpressionStatement executed`);
    return "expression statement"
  },
  BinaryExpression: (beNode, result, indent) => {
    console.log(`${" ".repeat(indent)}visitor.BinaryExpression executed`);
    return "binary statement"
  },
  NumericLiteral: (nlNode, result, indent) => {
    console.log(`${" ".repeat(indent)}visitor.NumericLiteral executed`);
    return "numeric literal"
  }
};

const traverser = createTraverser(getCode);
// ast は実際には File 型
// export interface File extends Node { // ※ NodeJS の Node ではない
//     type: "File";
//     program: Program;
//     comments: Comment[];
//     tokens: any[];
// }
const ast = babylon.parse(code);
const results = traverser(ast, visitor);
console.log(results);
