export const typeOf = (input: any) => {
  const rawObject = Object.prototype.toString.call(input).toLowerCase();
  const typeOfRegex = /\[object (.*)]/g;
  const result = typeOfRegex.exec(rawObject);
  return result?.[1];
};

export const deepEqualObjects = (source: any, target: any): boolean => {
  if (typeOf(source) !== typeOf(target)) {
    return false;
  }

  if (typeOf(source) === "array") {
    if (source.length !== target.length) {
      return false;
    }

    return source.every((entry: any, index: number) => deepEqualObjects(entry, target[index]));
  }

  if (typeOf(source) === "object") {
    if (Object.keys(source).length !== Object.keys(target).length) {
      return false;
    }

    return Object.keys(source).every(key =>
      deepEqualObjects(source[key], target[key]),
    );
  }

  if (typeOf(source) === "date") {
    return source.getTime() === target.getTime();
  }

  return source === target;
};
