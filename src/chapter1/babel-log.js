const babylon = require("babylon");
const log = require("babel-log");
const printAST = require("ast-pretty-print");

const ast = babylon.parse("1 + 2 * (3 + 4)");

// log(ast);  // 以下と等価(ソースもそうなっている)
console.log(printAST(ast));
// printAST は結果を文字列として取得するのでプログラム内で使うのに便利
