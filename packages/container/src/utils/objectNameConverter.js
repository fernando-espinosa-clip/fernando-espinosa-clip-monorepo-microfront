export const snakeToCamel = (str) =>
  str.toLowerCase().replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));

export const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export function transformArray(arr, transformFunction) {
  if (!Array.isArray(arr)) return false;
  for (let x = 0; x < arr.length; x++) {
    if (arr[x] instanceof Object && !Array.isArray(arr[x])) {
      arr[x] = transformObject(arr[x], transformFunction);
      continue;
    }
    if (Array.isArray(arr[x])) {
      arr[x] = transformArray(arr[x], transformFunction);
      continue;
    }
    // eslint-disable-next-line no-self-assign
    arr[x] = arr[x];
  }
  return arr;
}

export function transformObject(obj, transformFunction) {
  const keys = Object.keys(obj);
  const response = {};
  for (let key of keys) {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj.hasOwnProperty(key)) continue;
    const newKey = transformFunction(key);
    if (obj[key] instanceof Object && !Array.isArray(obj[key])) {
      response[newKey] = transformObject(obj[key], transformFunction);
      continue;
    }
    if (Array.isArray(obj[key])) {
      response[newKey] = transformArray(obj[key], transformFunction);
      continue;
    }
    response[newKey] = obj[key];
  }
  return response;
}

export function transformObjectSnakeCaseToCamelCase(obj) {
  return transformObject(obj, snakeToCamel);
}

export function transformObjectCamelCaseToSnakeCase(obj) {
  return transformObject(obj, camelToSnakeCase);
}
