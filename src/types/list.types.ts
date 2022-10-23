import { ElementStates } from "./element-states";

export type TListItem = 
  {
    value: string;
    state: ElementStates;
    head: string | React.ReactElement | null;
    tail: string | React.ReactElement | null;
  };

export type TLoading = {
  append: boolean;
  prepend: boolean; 
  removeHead: boolean; 
  removeTail: boolean; 
  insertAt: boolean; 
  removeFrom: boolean; 
  getSize?: boolean; 
  toArray?: boolean;
  disabled: boolean; 
}