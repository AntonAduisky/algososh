import React, { useState } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import {  reverseItems } from "./utils";
import { setDelay } from "../../utils/utils";
import { TStringResult } from "../../types/string.types";
import { MAX_LENGTH } from "../../constants/string";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringPage: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [result, setResult] = useState<TStringResult>([]);
  const [renderResult, setRenderResult] = useState<JSX.Element[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setString(e.currentTarget.value);
    setResult(e.currentTarget.value.split('').map((item) => {
      return {
        item,
        state: ElementStates.Default,
      };
    }));
  };

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    const reversedString =  reverseItems(string);
    renderAlgorithm();
    const arr = result;
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {

      await setDelay(DELAY_IN_MS);
      arr[start].state = ElementStates.Changing;
      arr[end].state = ElementStates.Changing;
      setResult(arr);
      renderAlgorithm();
      await setDelay(DELAY_IN_MS);
      arr[start].item = reversedString[start];
      arr[end].item = reversedString[end];
      arr[start].state = ElementStates.Modified;
      arr[end].state = ElementStates.Modified;
      setResult(arr);
      renderAlgorithm();
      start++;
      end--;
    }
    setLoader(false);
  };

  const renderAlgorithm = () => {
    setRenderResult(result.map((item, index) => {
      return (
        <li className={styles.items} key={index}>
          <Circle
            letter={item.item}
            state={item.state}
            dataCy={index}
          />
        </li>
      );
    }));
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleClick}>
        <Input
          type={'text'}
          max={MAX_LENGTH}
          maxLength={MAX_LENGTH}
          isLimitText={true}
          value={string}
          onChange={handleChange}
          dataCy={"reverse-input"}
        />
        <Button 
        type="submit" 
        text="развернуть" 
        disabled={!string} 
        isLoader={loader}
        dataCy={"reverse-button"}
        />
      </form>
      <ul className={styles.list}>
        {renderResult}
      </ul>
    </SolutionLayout>
  );
};
