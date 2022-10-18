import { TNewArray } from "../../types/sorting.types"

export const swap = (arr: TNewArray, first: number, second: number) => {
  const temp = arr[first]
  arr[first] = arr[second]
  arr[second] = temp
}

export const randomArr = (min = 3, max = 17) => {
  const arr = [];
  const limit = Math.floor(Math.random() * (max + 1 - min)) + min;
  for (let i = 0; i < limit; i++) {
    arr.push(Math.floor(Math.random()*100));
  }
  return arr;
}