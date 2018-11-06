const { parse } = require("babylon");
const { createTraverser } = require("./traverser");
const { createExitVisitor } = require("./visitor");

const code = process.argv.slice(2).join();
const getCode = node => code.substr(node.start, node.end - node.start);
const traverser = createTraverser(getCode);
const exitVisitor = createExitVisitor(getCode)
const results = traverser(parse(code), exitVisitor);
console.log();
results.forEach(result => console.log(result));

// Usage
// $ node ./src/chapter1/ast-calc.js '1 + 2 * (3 + 4)'