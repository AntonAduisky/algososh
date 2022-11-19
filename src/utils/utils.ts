export const setDelay = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

export function swap<T>(arr: T[], firstIdx: number, secondIdx: number): void {
  const tmp = arr[firstIdx];
  arr[firstIdx] = arr[secondIdx];
  arr[secondIdx] = tmp;
};