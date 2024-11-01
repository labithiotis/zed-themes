export async function useCache<T>(
  group: string,
  key: string,
  headers: HeadersInit | undefined,
  fn: () => Promise<T>,
): Promise<T> {
  let cache: Cache | undefined;

  if (globalThis.caches) {
    try {
      cache = await globalThis.caches.open(group);
      const cachedRecords = await cache.match(key);

      if (cachedRecords) {
        console.debug(`Cache HIT for ${group} ${key}`);
        return cachedRecords.json();
      }
    } catch (e) {
      console.warn(`Cache error for ${group} ${key}`, e);
    }
  }

  const data = await fn();

  if (globalThis.caches && cache) {
    await cache.put(
      key,
      new Response(JSON.stringify(data), {
        headers: {
          'Cache-Control': 'max-age=3600',
          ...headers,
        },
      }),
    );
  }

  return data;
}
