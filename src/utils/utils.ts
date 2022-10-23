export const setDelay = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};