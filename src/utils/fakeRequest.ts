export function fakeRequest<T>(delay: number, value: T) {
  return new Promise<T>((resolve) => setTimeout(resolve, delay, value));
}
