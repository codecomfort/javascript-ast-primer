const babylon = require("babylon");

// ソースコードを AST へ変換する
const ast = babylon.parse("1 + 2 * (3 + 4)");

console.log(ast);
