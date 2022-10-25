import React, { ChangeEvent, useMemo, useState } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { LinkedList, randomStringArr } from "./utils";
import { TListItem, TLoading } from "../../types/list.types";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { setDelay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MAX_LENGTH, MAX_SIZE, MIN_LENGTH } from "../../constants/list";

export const ListPage: React.FC = () => {
  const [inputValue, setValueInput] = useState('');
  const [indexInput, setIndexInput] = useState('');
  //делаем инстанс класса связного списка и добавляем в конструктор массив рандомных числе
  const listInstance = useMemo(() => new LinkedList<string>(randomStringArr()), []);
  const [list, setList] = useState<LinkedList<string>>(listInstance);
  const [loader, setLoader] = useState<TLoading>({
    append: false,
    prepend: false,
    removeHead: false,
    removeTail: false,
    insertAt: false,
    removeFrom: false,
    getSize: false,
    toArray: false,
    disabled: false
  });

  const renderData = (array: string[]): TListItem[] => {
    return array.map((item, index) => {
      if (array.length === 1) {
        return {
          value: item,
          state: ElementStates.Default,
          head: "head",
          tail: "tail"
        }
      }
      if (index === 0) {
        return {
          value: item,
          state: ElementStates.Default,
          head: "head",
          tail: null
        }
      }
      if (index === array.length - 1) {
        return {
          value: item,
          state: ElementStates.Default,
          head: null,
          tail: "tail"
        }
      }
      return {
        value: item,
        state: ElementStates.Default,
        head: null,
        tail: null
      }
    })
  }

  //заполняем стартовый массив дефолтными кружками с цифрами из массива с рандомными числами
  const [result, setResult] = useState<TListItem[]>(renderData(list.toArray()));

  //отрисовка малого кружочка-превью в зависимости от позиции добавления
  const addSmallTopCircle = (array: TListItem[], value: string, index: number, position: "head" | "tail") => {
    if (array.length > 0 && position === "head") {
      array[index].head = (
        <Circle
          key={index}
          letter={value}
          state={ElementStates.Changing}
          isSmall
        />
      )
    }
    if (array.length > 0 && position === "tail") {
      array[index].tail = (
        <Circle
          key={index}
          letter={value}
          state={ElementStates.Changing}
          isSmall
        />
      )
    }
  }

  //добавление в начало связного-списка
  const handleAppend = async () => {
    setLoader({
      ...loader,
      append: true,
      disabled: true
    });
    const input = inputValue;
    setValueInput('');
    const listTmp = list;
    let resultTmp = [...result];
    addSmallTopCircle(resultTmp, input, 0, "head");
    setResult([...resultTmp]);
    listTmp.prepend(input);
    await setDelay(SHORT_DELAY_IN_MS);

    setList(listTmp);
    resultTmp = renderData(list.toArray());
    resultTmp[0].state = ElementStates.Modified;
    setResult([...resultTmp]);
    await setDelay(SHORT_DELAY_IN_MS);

    setResult([...renderData(list.toArray())]);
    setLoader({
      ...loader,
      append: false,
      disabled: false
    });
  }

  //добавление в конец связного-списка
  const handlePrepend = async () => {
    setLoader({
      ...loader,
      prepend: true,
      disabled: true
    });
    const input = inputValue;
    setValueInput('');
    const listTmp = list;
    let resultTmp = [...result];
    addSmallTopCircle(resultTmp, input, resultTmp.length - 1, "head");
    setResult([...resultTmp]);
    listTmp.append(input);
    await setDelay(SHORT_DELAY_IN_MS);

    setList(listTmp);
    resultTmp = renderData(list.toArray());
    resultTmp[resultTmp.length - 1].state = ElementStates.Modified;
    setResult([...resultTmp]);
    await setDelay(SHORT_DELAY_IN_MS);

    setResult([...renderData(list.toArray())]);
    setLoader({
      ...loader,
      prepend: false,
      disabled: false
    });
  }

  //удалить из начала связного-списка
  const handleRemoveHead = async () => {
    const head = list.getHead();
    if (head === null) {
      return;
    } else {
      setLoader({
        ...loader,
        removeHead: true,
        disabled: true
      });
      const listTmp = list;
      let resultTmp = [...result];
      addSmallTopCircle(resultTmp, resultTmp[0].value, 0, "tail");
      resultTmp[0].value = '';
      setResult([...resultTmp]);
      await setDelay(SHORT_DELAY_IN_MS);

      listTmp.removeHead();
      setList(listTmp);
      resultTmp = renderData(list.toArray());
      setResult([...resultTmp]);
      setLoader({
        ...loader,
        removeHead: false,
        disabled: false
      });
    }
  }

  //удалить из конца связного-списка
  const handleRemoveTail = async () => {
    setLoader({
      ...loader,
      removeTail: true,
      disabled: true
    });
    const listTmp = list;
    let resultTmp = [...result];
    const length = resultTmp.length;
    addSmallTopCircle(resultTmp, resultTmp[length - 1].value, length - 1, "tail");
    resultTmp[length - 1].value = '';
    setResult([...resultTmp]);
    await setDelay(SHORT_DELAY_IN_MS);

    listTmp.removeTail();
    setList(listTmp);
    resultTmp = renderData(list.toArray());
    setResult([...resultTmp]);
    setLoader({
      ...loader,
      removeTail: false,
      disabled: false
    });
  }

  // вставить по индексу
  const handleInsertAt = async () => {
    if (parseInt(indexInput) < 0 || parseInt(indexInput) > list.getSize() - 1) {
      setIndexInput('');
      return;
    }
    setLoader({
      ...loader,
      insertAt: true,
      disabled: true
    });
    const index = parseInt(indexInput);
    const value = inputValue;
    const listTmp = list;
    let resultTmp = [...result];
    setValueInput('');
    setIndexInput('');
    if (index === 0) {
      addSmallTopCircle(resultTmp, value, 0, "head");
      setResult([...resultTmp]);
      listTmp.prepend(value);
      await setDelay(SHORT_DELAY_IN_MS);

      setList(listTmp);
      resultTmp = renderData(list.toArray());
      resultTmp[0].state = ElementStates.Modified;
      setResult([...resultTmp]);
      await setDelay(SHORT_DELAY_IN_MS);

      setResult([...renderData(list.toArray())]);
    } else {
      let current = listTmp.getHead();
      let currentIndex = 0;
      while (currentIndex < index) {
        if (currentIndex - 1 >= 0) {
          resultTmp[currentIndex - 1].head = null;
          resultTmp[currentIndex - 1].state = ElementStates.Changing;
        }
        addSmallTopCircle(resultTmp, value, currentIndex, "head");
        setResult([...resultTmp]);
        await setDelay(SHORT_DELAY_IN_MS);

        currentIndex++;
        if (current?.next && currentIndex !== index) {
          current = current?.next;
        }
      }
      if (current) {
        if (currentIndex - 1 >= 0) {
          resultTmp[currentIndex - 1].head = null;
          resultTmp[currentIndex - 1].state = ElementStates.Changing;
        }
        addSmallTopCircle(resultTmp, value, currentIndex, "head");
        setResult([...resultTmp]);
        await setDelay(SHORT_DELAY_IN_MS);

        listTmp.insertAt(value, index);
        setList(listTmp);
        resultTmp = renderData(list.toArray());
        setResult([...resultTmp]);
        resultTmp[currentIndex].state = ElementStates.Modified;
        setResult([...resultTmp]);
        await setDelay(SHORT_DELAY_IN_MS);

        setResult([...renderData(list.toArray())]);
      }
    }
    setLoader({
      ...loader,
      insertAt: false,
      disabled: false
    });
  }

  // удалить по индексу
  const handleRemoveFrom = async () => {
    if (parseInt(indexInput) < 0 || parseInt(indexInput) > list.getSize() - 1) {
      setIndexInput('');
      return;
    }
    setLoader({
      ...loader,
      removeFrom: true,
      disabled: true
    });
    const index = parseInt(indexInput);
    const listTmp = list;
    let resultTmp = [...result];
    setIndexInput('');
    const head = listTmp.getHead();
    if (index >= 0 && index < listTmp.getSize() && head) {
      let current = head;
      let currentIndex = 0;
      if (index === 0) {
        resultTmp[0].state = ElementStates.Changing;
        setResult([...resultTmp]);
        await setDelay(SHORT_DELAY_IN_MS);

        resultTmp[0].state = ElementStates.Default;
        addSmallTopCircle(resultTmp, resultTmp[0].value, 0, "tail");
        resultTmp[0].value = '';
        setResult([...resultTmp]);
        await setDelay(SHORT_DELAY_IN_MS);

        listTmp.removeHead();
        setList(listTmp);
        resultTmp = renderData(list.toArray());
        setResult([...resultTmp]);
      } else {
        while (currentIndex < index) {
          resultTmp[currentIndex].state = ElementStates.Changing;
          setResult([...resultTmp]);
          await setDelay(SHORT_DELAY_IN_MS);

          currentIndex++
          if (current.next) {
            current = current?.next;
          }
        }
        resultTmp[currentIndex].state = ElementStates.Changing;
        setResult([...resultTmp]);
        await setDelay(SHORT_DELAY_IN_MS);

        resultTmp[currentIndex].state = ElementStates.Default;
        addSmallTopCircle(resultTmp, resultTmp[currentIndex].value, currentIndex, "tail");
        resultTmp[currentIndex].value = '';
        setResult([...resultTmp]);
        await setDelay(SHORT_DELAY_IN_MS);

        listTmp.removeFrom(index);
        setList(listTmp);
        resultTmp = renderData(list.toArray());
        setResult([...resultTmp]);
      }
    }
    setLoader({
      ...loader,
      removeFrom: false,
      disabled: false
    });
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        <div className={styles.wrapper}>
          <Input
            extraClass={styles.input}
            maxLength={MAX_LENGTH}
            max={MAX_LENGTH}
            isLimitText
            placeholder="Введите значение"
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValueInput(e.target.value)}
          />
          <Button
            text="Добавить в head"
            linkedList="small"
            onClick={handleAppend}
            disabled={
              inputValue === ''
              || loader.disabled
              || list.getSize() === MAX_SIZE
            }
            isLoader={loader.append}
          />
          <Button
            text="Добавить в tail"
            linkedList="small"
            onClick={handlePrepend}
            disabled={
              inputValue === ''
              || loader.disabled
              || list.getSize() === MAX_SIZE
            }
            isLoader={loader.prepend}
          />
          <Button
            text="Удалить из head"
            linkedList="small"
            onClick={handleRemoveHead}
            disabled={
              list.toArray().length === MIN_LENGTH
              || loader.disabled
            }
            isLoader={loader.removeHead}
          />
          <Button
            text="Удалить из tail"
            linkedList="small"
            onClick={handleRemoveTail}
            disabled={
              list.toArray().length === MIN_LENGTH
              || loader.disabled
            }
            isLoader={loader.removeTail}
          />
        </div>
        <div className={styles.wrapper}>
          <Input
            extraClass={styles.input}
            placeholder="Введите индекс"
            value={indexInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setIndexInput(e.target.value)}
          />
          <Button
            text="Добавить по индексу"
            linkedList="big"
            onClick={handleInsertAt}
            isLoader={loader.insertAt}
            disabled={inputValue === ''
              || indexInput === ''
              || loader.disabled
              || list.getSize() === MAX_SIZE
            }
          />
          <Button
            text="Удалить по индексу"
            linkedList="big"
            onClick={handleRemoveFrom}
            isLoader={loader.removeFrom}
            disabled={
              indexInput === ''
              || list.toArray().length === MIN_LENGTH
              || loader.disabled
              || !parseInt(indexInput)
              || parseInt(indexInput) < 0
              || parseInt(indexInput) > list.getSize() - 1}

          />
        </div>
      </form>
      <ul className={styles.list}>
        {result.map((item, index, arr) => {
          return (
            <li className={styles.items} key={index}>
              <Circle
                letter={item.value}
                head={item.head}
                tail={item.tail}
                index={index}
                extraClass={styles.circle}
                state={item.state}
              />
              {index < arr.length - 1 &&
                <ArrowIcon />
              }
            </li>)
        })}
      </ul>
    </SolutionLayout>
  );
};
