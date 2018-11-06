const babylon = require("babylon");
const { replacer } = require("./print-ast-outline");

// Usage node print-ast-outline.test.js '1 + 2 * (3 + 4)'
// ast は実際には File 型
const ast = babylon.parse(process.argv.slice(2).join());

console.log(JSON.stringify(ast, replacer, "  "));
// 以下と比較するとよい
// console.log(JSON.stringify(ast, null, "  "));
