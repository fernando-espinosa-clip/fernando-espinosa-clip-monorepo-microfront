export function createArray(N) {
  let a = Array(N),
    b = 0;
  while (b < N) a[b++] = b;
  return a;
}

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
