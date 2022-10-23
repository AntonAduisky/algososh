import { ElementStates } from "./element-states";

export type TStackItem = {
  value: string;
  state: ElementStates;
};

export type TLoading = {
  added: boolean,
  removed: boolean
};