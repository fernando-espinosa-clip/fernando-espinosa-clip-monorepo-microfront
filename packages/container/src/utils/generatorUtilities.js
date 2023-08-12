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

export function cloneObj(aObject) {
  // Prevent undefined objects
  // if (!aObject) return aObject;

  let bObject = Array.isArray(aObject) ? [] : {};

  let value;
  for (const key in aObject) {
    // Prevent self-references to parent object
    // if (Object.is(aObject[key], aObject)) continue;

    value = aObject[key];

    bObject[key] = typeof value === 'object' ? cloneObj(value) : value;
  }

  return bObject;
}
