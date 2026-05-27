import { fn as _fn } from "@std/expect";

export { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
export { expect } from "@std/expect";

type AnyFn = (...args: never[]) => unknown;

export interface JestMock<F extends AnyFn = AnyFn> {
  (...args: Parameters<F>): ReturnType<F>;
  mockReturnValueOnce(value: ReturnType<F>): JestMock<F>;
  mockImplementation(impl: F): JestMock<F>;
}

const fn = <F extends AnyFn>(impl?: F): JestMock<F> => {
  const queue: ReturnType<F>[] = [];
  let currentImpl = impl;
  const wrapper = _fn(
    ((...args: Parameters<F>): ReturnType<F> => {
      if (queue.length > 0) return queue.shift() as ReturnType<F>;
      return (currentImpl?.(...args) ?? undefined) as ReturnType<F>;
    }) as F,
  ) as unknown as JestMock<F>;
  wrapper.mockReturnValueOnce = (value) => {
    queue.push(value);
    return wrapper;
  };
  wrapper.mockImplementation = (newImpl) => {
    currentImpl = newImpl;
    return wrapper;
  };
  return wrapper;
};

export const jest = { fn };

export namespace jest {
  export type Mock<F extends AnyFn = AnyFn> = JestMock<F>;
}
