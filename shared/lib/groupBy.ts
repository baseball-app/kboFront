export const groupBy = <T, K extends keyof T>(list: T[], func: (obj: T) => T[K]) => {
  const result: Record<string, T[]> = {};

  list.forEach(obj => {
    const key = func(obj);

    if (result[String(key)]) {
      result[String(key)].push(obj);
    } else {
      result[String(key)] = [obj];
    }
  });

  return result;
};
