import { ElementStates } from "./element-states";

export type TSortingLoader = {
  ascending: boolean;
  descending: boolean;
}

export type TColumns = 
  {
    number: number;
    state: ElementStates;
  };

export type TNewArray = Array<TColumns>
