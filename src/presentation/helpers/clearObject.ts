export const clearObject = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keysToDelete: Array<Keys>,
): Omit<Obj, Keys> => {
  const newObj = { ...obj };

  for (let key of keysToDelete) {
    delete newObj[key];
  }

  return newObj;
};
