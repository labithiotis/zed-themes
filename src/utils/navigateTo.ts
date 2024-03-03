export function navigateTo(path: string) {
  const url = new URL(location.origin + path);
  location.href = url.toString();
}
