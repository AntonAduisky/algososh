import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { swap } from "./utils";
import { setDelay } from "../../utils/utils";
import { TStringResult } from "../../types/string.types";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [result, setResult] = useState<TStringResult>([]);
  const [step, setStep] = useState<number>(-1);
  const [loader, setLoader] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value);
  };

  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let items = string.split('');
    if (items.length < 2) {
      setResult([{ item: items[0], state: ElementStates.Modified }]);
      return;
    }
    setResult(
      items.map((item, index) => {
        let elementState =
          index === 0 || index === string.length - 1
            ? ElementStates.Changing
            : ElementStates.Default;
        return {
          item,
          state: elementState,
        };
      })
    );
    setLoader(true);
    setStep(0);
  };


  const reverseItems = async () => {
    if (step < 0) {
      return;
    }
    if (step >= result.length / 2) {
      setLoader(false);
      return;
    }
    setResult(await swap(result, step, setDelay));
    setStep(step + 1);
  };


  useEffect(() => {
    reverseItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);


  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleClick}>
        <Input
          type={'text'}
          max="11"
          maxLength={11}
          isLimitText={true}
          value={string}
          onChange={handleChange}
        />
        <Button type="submit" text="развернуть" disabled={!string} isLoader={loader} />
      </form>
      <ul className={styles.list}>
        {string &&
          result.map((item, index) => (
            <li className={styles.items} key={index}>
              <Circle
                state={item.state}
                letter={item.item}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
