import React, { ChangeEvent, useMemo, useState } from "react";
import styles from './stack-page.module.css';
import { TLoading, TStackItem } from "../../types/stack.types";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./utils";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { X_SHORT_DELAY_IN_MS } from "../../constants/delays";


export const StackPage: React.FC = () => {
  const [value, setValue] = React.useState<string>('');

  const stackInstance = useMemo(() => new Stack<TStackItem>(), []);
  const [stack, setStack] = useState<Stack<TStackItem>>(stackInstance);
  const [result, setResult] = useState<TStackItem[]>([]);
  const [loader, setLoader] = useState<TLoading>({
    added: false,
    removed: false
  });


  const handleAdd = async () => {
    setLoader({
      ...loader,
      added: true
    })
    const inputValue = value;
    const stackTmp = stack;
    stackTmp.push({ value: inputValue, state: ElementStates.Changing });
    setValue('');
    setStack(stackTmp);
    setResult([...stackTmp.getElements()]);
    await setDelay(X_SHORT_DELAY_IN_MS);
    stackTmp.peak().state = ElementStates.Default;
    setStack(stackTmp);
    setResult([...stackTmp.getElements()]);
    setLoader({
      ...loader,
      added: false,
    })
  }


  const handleRemove = async () => {
    setLoader({
      ...loader,
      removed: true
    })
    const stackTmp = stack;
    const peakValue = stackTmp.peak();
    if (peakValue) {
      peakValue.state = ElementStates.Changing;
    }
    setStack(stackTmp);
    setResult([...stackTmp.getElements()]);
    await setDelay(X_SHORT_DELAY_IN_MS);
    stackTmp.pop();
    setStack(stackTmp);
    setResult([...stackTmp.getElements()]);
    setLoader({
      ...loader,
      removed: false
    })
  }


  const handleClear = async () => {
    setLoader({
      ...loader,
      removed: true
    })
    const stackTmp = stack;
    stackTmp.clear();
    setStack(stackTmp);
    setResult([]);
    setLoader({
      ...loader,
      removed: false
    })
  }


  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        < Input
          extraClass={styles.input}
          maxLength={4}
          max={4}
          isLimitText
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
        <Button
          text="Добавить"
          onClick={handleAdd}
          disabled={!value || loader.removed || stack.getSize() > 5}
          isLoader={loader.added}
        />
        <Button
          text="Удалить"
          onClick={handleRemove}
          disabled={stack.getSize() === 0 || loader.added}
          isLoader={loader.removed}
        />
        <Button
          text="Очистить"
          onClick={handleClear}
          disabled={stack.getSize() === 0 || loader.added}
        />
      </form>
      <ul className={styles.list}>
        {result.map((item, index) => {
          return (
            <li className={styles.items} key={index}>
              <Circle
                state={item.state}
                letter={item.value || ''}
                index={index}
                head={index === stack.getSize() - 1 ? 'top' : ''}
              />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
