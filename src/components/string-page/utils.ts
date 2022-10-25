import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states"
import { TStringResult } from "../../types/string.types";

export const swap = async (array: TStringResult, step: number, delay: (ms: number) => Promise<unknown>) => {

  let res = [...array];

  if (res.length === 1) {
    res[0].state = ElementStates.Modified;
    return res;
  }

  let tmp = res[step];
  res[step] = res[res.length - step - 1];
  res[res.length - step - 1] = tmp;

  res[step].state = ElementStates.Modified;
  res[res.length - step - 1].state = ElementStates.Modified;

  if (step + 1 < res.length - step - 2) {
    res[step + 1].state = ElementStates.Changing;
    res[res.length - step - 2].state = ElementStates.Changing;
  }

  if (step + 1 === res.length - step - 2) {
    res[step + 1].state = ElementStates.Modified;
  }
  await delay(DELAY_IN_MS)
  return res;
}