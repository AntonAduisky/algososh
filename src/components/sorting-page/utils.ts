import { MAX_NUMBER, MIN_NUMBER } from "../../constants/sorting"

export const randomArr = (min = MIN_NUMBER, max = MAX_NUMBER) => {
  const arr = [];
  const limit = Math.floor(Math.random() * (max + 1 - min)) + min;
  for (let i = 0; i < limit; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}