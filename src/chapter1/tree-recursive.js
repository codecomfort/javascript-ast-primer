console.log(`null: ${typeof(null)}`)
console.log(`undefined: ${typeof(undefined)}`)

const obj = {
  hoge: {
    fuga: [1, 2, 3]
  },
  piyo: "ぴよ",
  foo: {
    bar: {
      baz: null
    }
  }
};

const objToString = (node, indent = 0) => {
  const leading = " ".repeat(indent);

  // node が typeof(null) → 'object' なので末尾の存在チェックは必要
  // ちなみに typeof(undefined) → 'undefined'
  if (typeof node === "object" && node) {
    const keys = Object.keys(node);
    return keys
      .map(key => {
        const value = node[key];
        return `${leading}${key}:\n${objToString(node[key], indent + 2)}`;
      })
      .join("\n");
  }

  return `${leading}${node}`;
};

console.log(objToString(obj))