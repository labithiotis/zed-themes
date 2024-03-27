// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Args = any[];
export function debounce<F extends (...args: Args) => void>(fn: F, delay: number) {
  let timeoutId: number | NodeJS.Timeout;
  return function (this: object, ...args: Args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  } as F;
}
