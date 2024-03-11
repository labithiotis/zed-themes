export function debounce<F extends (...params: any[]) => void>(
  fn: F,
  delay: number
) {
  let timeoutId: number | NodeJS.Timeout;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  } as F;
}
