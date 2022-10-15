import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { checkValidity, getFibonacciNumber } from "./utils";
import { setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] =  React.useState<number>(-1);
  const [result, setResult] = useState<number[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(Number(e.target.value));
  };

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   setLoader(true)
   const arr = getFibonacciNumber(number!);
   for (let i = 0; i < arr.length; i++) {
    await setDelay(SHORT_DELAY_IN_MS);
    setResult(arr.slice(0, i + 1))
   }
   setLoader(false); 
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleClick}>
        <Input
          type={'text'}
          min="1"
          max="19"
          maxLength={19}
          isLimitText={true}
          onChange={handleChange}
        />
        <Button type="submit" text="рассчитать" disabled={checkValidity(number) || !number} isLoader={loader} />
      </form>
      <ul className={styles.list}>
        {result?.length > 0 &&
          result.map((item, index) => (
            <li className={styles.items} key={index}>
              <Circle
              letter={item.toString()}
              index={index}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
