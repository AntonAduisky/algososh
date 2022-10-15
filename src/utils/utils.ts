export function setUniqueId(): number {
  return Date.now() * Math.random()
};

export const setDelay = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};