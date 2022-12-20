
export function flat(arr) {
  const newArr = [];
  arr.forEach(i =>
      Array.isArray(i) ? newArr.push(...flat(i)) : newArr.push(i)
  );
  return newArr;
}
