import { MAX_NUMBER, MIN_NUMBER } from "../../constants/fibonacci";

export const getFibonacciNumber = (n: number): number[] => {
  let arr: number[] = [1, 1];
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};

export const checkValidity = (number: number) => {
  if (number && (number < MIN_NUMBER || number > MAX_NUMBER)) return false;

  return true;
};