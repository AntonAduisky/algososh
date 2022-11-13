import { swap } from "../../utils/utils";

export const reverseItems = (str: string): string => {
  const arr = str.split('');
  let start = 0;
  let end = arr.length - 1;

  while(start <= end) {
    swap<string>(arr, start, end);
    start++;
    end--;
  }

  return arr.join('');
};