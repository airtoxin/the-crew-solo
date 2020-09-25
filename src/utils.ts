export const range = (max: number, min: number = 0): number[] =>
  Array.from(Array(max + 1 - min)).map((_, i) => i + min);

export const shuffle = <T>([...arr]: T[]): T[] => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

let id = Math.random();
export const generateId = (): number => id + Math.random();

export const assertUnreachable = (x: never) => {
  throw new Error(`Expected never type but got: ${x}`);
};
