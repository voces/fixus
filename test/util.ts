export const instrument = <T extends readonly unknown[], U>(name: string, fn: (...args: T) => U) => (...args: T): U => {
  BJDebugMsg(name + " start");
  const v = fn(...args);
  BJDebugMsg(name + " end");
  return v;
};

export const repeat = (count: number, fn: () => void): void => {
  for (let i = 0; i < count; i++) {
    fn();
  }
};
