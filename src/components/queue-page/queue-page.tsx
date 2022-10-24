import React, { ChangeEvent, useMemo, useState } from "react";
import styles from './queue-page.module.css';
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Queue } from "./utils";
import { TLoading, TQueueItem } from "../../types/queue.types";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { X_SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MAX_LENGTH, MAX_NUMBER, MIN_NUMBER } from "../../constants/queue";

export const QueuePage: React.FC = () => {
  const [value, setValue] = React.useState<string>('');

  const queueInstance = useMemo(() => new Queue<TQueueItem>(7), []);
  const [queue, setQueue] = useState<Queue<TQueueItem>>(queueInstance);
  const [result, setResult] = useState<(TQueueItem | null)[]>([]);
  const [loader, setLoader] = useState<TLoading>({
    added: false,
    removed: false
  });


  const getDefaultQueue = () => {
    const arr: Array<JSX.Element> = [];
    for (let i = MIN_NUMBER; i < MAX_NUMBER; i++) {
      arr.push(<li className={styles.items} key={i}>
        <Circle
          state={ElementStates.Default}
          letter=''
          index={i}
          head=''
          tail=''
        />
      </li>);
    }
    return arr;
  }


  const handleAdd = async () => {
    setLoader({
      ...loader,
      added: true
    });
    const queueTmp = queue;
    const queueItems = queueTmp.getElements();
    queueTmp.enqueue({
      value,
      state: ElementStates.Changing
    });
    setValue('');
    setQueue(queueTmp);
    setResult([...queueTmp.getElements()]);
    await setDelay(X_SHORT_DELAY_IN_MS);
    const tailItem = queueItems[queueTmp.getTail()];
    if (tailItem) tailItem.state = ElementStates.Default;
    setQueue(queueTmp);
    setResult([...queueTmp.getElements()]);
    setLoader({
      ...loader,
      added: false
    });
  }


  const handleRemove = async () => {
    setLoader({
      ...loader,
      removed: true
    });
    const queueTmp = queue;
    const headItem = queueTmp.peak();
    if (headItem) headItem.state = ElementStates.Changing;
    setQueue(queueTmp);
    setResult([...queueTmp.getElements()]);
    await setDelay(X_SHORT_DELAY_IN_MS);
    queueTmp.dequeue();
    setQueue(queueTmp);
    setResult([...queueTmp.getElements()]);
    setLoader({
      ...loader,
      removed: false
    });
  }


  const handleClear = async () => {
    setLoader(({ ...loader, removed: true }));
    const queueTmp = queue;
    await setDelay(X_SHORT_DELAY_IN_MS);
    queueTmp.clear();
    setQueue(queueTmp);
    setLoader(({ ...loader, removed: false }));
  };


  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        < Input
          placeholder="введите значение"
          extraClass={styles.input}
          maxLength={MAX_LENGTH}
          max={MAX_LENGTH}
          isLimitText
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
        <Button
          text="Добавить"
          onClick={handleAdd}
          disabled={!value || loader.removed || queue.getLength() === MAX_NUMBER}
          isLoader={loader.added}
        />
        <Button
          text="Удалить"
          onClick={handleRemove}
          disabled={
            queue.isEmpty()
            || loader.added
            || queue.isEmpty()}
          isLoader={loader.removed}
        />
        <Button
          text="Очистить"
          onClick={handleClear}
          disabled={
            queue.isEmpty()
            || loader.added
            || queue.isEmpty()}
          isLoader={loader.removed}
        />
      </form>
      <ul className={styles.list}>
        {queue.isEmpty() && getDefaultQueue()}
        {!queue.isEmpty() &&
          result.map((item, index) => {
            return (
              <li className={styles.items} key={index}>
                <Circle
                  state={item?.state}
                  letter={item?.value || ''}
                  index={index}
                  head={index === queue.getHead() ? 'head' : ''}
                  tail={index === queue.getTail() ? 'tail' : ''}
                />
              </li>
            )
          })}
      </ul>
    </SolutionLayout>
  );
};
