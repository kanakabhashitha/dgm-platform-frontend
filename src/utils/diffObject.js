export function diffObject(newObj, oldObj) {
  const dirty = {};
  for (const key in newObj) {
    if (newObj[key] !== oldObj[key]) {
      dirty[key] = newObj[key];
    }
  }
  return dirty;
}
