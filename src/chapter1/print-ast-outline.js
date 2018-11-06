const isNode = obj => {
  // Node または Node[] は必ず object 型
  if (typeof obj !== "object") {
    return false;
  }

  // 配列の場合、Node 型の要素が見つかれば true
  if (Array.isArray(obj)) {
    return obj.find(element => isNode(element)) !== undefined;
  }

  // 配列でない場合の判定
  // Node 型が export されていないので instanceof で判定できない
  // よって、constructor.name が Node なら Node であるとみなす
  // ちなみに、なぜか TS では export されている
  // %AppData%\Local\Microsoft\TypeScript\3.1\node_modules\@types\babylon\index.d.ts
  return obj && "constructor" in obj && obj.constructor.name === "Node";
};

const isNodeLike = obj => {
  // Node または Node[] は必ず object 型
  if (typeof obj !== "object") {
    return false;
  }

  if (Array.isArray(obj)) {
    return obj.find(element => isNode(element)) !== undefined;
  }

  // Node 判定の別解
  return (
    obj &&
    typeof obj.type === "string" &&
    typeof obj.start === "number" &&
    typeof obj.end === "number" &&
    typeof obj.loc === "object"
  );
};

const replacer = (key, value) => {
  // if (!key || key === "type" || isNode(value)) {
  if (!key || key === "type" || isNodeLike(value)) {
    return value;
  }

  return undefined;
};

module.exports = {
  isNode,
  isNodeLike,
  replacer
};