import { ElementStates } from "./element-states";

export type TQueueItem = {
  value: string;
  state: ElementStates;
}

export type TLoading = {
  added: boolean,
  removed: boolean
};