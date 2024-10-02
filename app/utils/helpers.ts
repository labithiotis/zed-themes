export type PartialRecursive<T> = T extends (infer U)[]
  ? PartialRecursive<U>[]
  : T extends object
    ? { [K in keyof T]?: PartialRecursive<T[K]> }
    : T;

export const isRecord = <T = unknown>(record: unknown): record is Record<string, T> =>
  isObject(record) && !isArray(record);

export const isObject = <T extends Record<string, unknown>>(object: unknown): object is T =>
  Boolean(object && typeof object === 'object');

export const isArray = <T>(array: T[] | unknown): array is Array<T> => Array.isArray(array);

export const uniq = <T>(array: T[]): T[] => array.filter((v, i) => array.indexOf(v) === i);

// Using own implementation of merge over lodash as theirs mutates initial source in param
// Also this merge will merge objects in arrays at same index as well as only unique ones
export function merge<T extends Record<string, unknown>>(
  source?: T,
  ...sources: (Record<string, unknown> | undefined)[]
): T {
  const target: Record<string, unknown> = {};

  for (const obj of [source, ...sources]) {
    if (isObject(obj)) {
      for (const key of Object.keys(obj)) {
        const targetValue = target[key];
        const sourceValue = obj[key];
        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
          if (targetValue.some(isObject) || sourceValue.some(isObject)) {
            target[key] = sourceValue;
          } else {
            target[key] = uniq([...targetValue, ...sourceValue]);
          }
        } else if (isObject(targetValue) && isObject(sourceValue)) {
          target[key] = merge(Object.assign({}, targetValue), sourceValue);
        } else {
          target[key] = sourceValue;
        }
      }
    }
  }

  return target as T;
}

export const NotFoundResponse = new Response(null, {
  status: 404,
  statusText: 'Not Found',
});
