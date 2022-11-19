import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./sorting-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from '../../types/element-states';
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { randomArr} from "./utils";
import { setDelay, swap } from "../../utils/utils";
import { X_SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TColumns, TSortingLoader } from "../../types/sorting.types";

export const SortingPage: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>("selection");
  const [newArray, setNewArray] = useState<TColumns[]>([]);
  const [loader, setLoader] = useState<TSortingLoader>({
    ascending: false,
    descending: false
  }
  );

  const handleSorting = (ascending: boolean) => {
    if (selectedSort === "selection") {
      selectionSort(ascending)
    }
    if (selectedSort === "bubble") {
      bubbleSort(ascending)
    }
  }

  const handleSetNewArray = () => {
    const arr = randomArr();
    const columns = arr.map((number) => {
      return {
        number,
        state: ElementStates.Default
      }
    })
    setNewArray(columns);
  }

  const selectionSort = async (ascending: boolean) => {
    setLoader({
      ascending,
      descending: !ascending
    });

    const arr = newArray.slice();

    for (let i = 0; i < arr.length; i++) {
      let sortIdx = i;
      arr[sortIdx].state = ElementStates.Changing;
      setNewArray([...arr]);
      for (let j = i + 1; j < arr.length; j++) {
        arr[j].state = ElementStates.Changing;
        setNewArray([...arr]);
        await setDelay(X_SHORT_DELAY_IN_MS);
        if (ascending) {
          if (arr[j].number < arr[sortIdx].number) {
            sortIdx = j;
          }
        } else {
          if (arr[j].number > arr[sortIdx].number) {
            sortIdx = j;
          }
        }
        arr[j].state = ElementStates.Default;
        setNewArray([...arr]);
        await setDelay(X_SHORT_DELAY_IN_MS);
      }
      swap<TColumns>(arr, i, sortIdx);
      arr[sortIdx].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setNewArray([...arr]);
      await setDelay(X_SHORT_DELAY_IN_MS);
    }
    setLoader({
      ascending: false,
      descending: false
    });
  }

  const bubbleSort = async (ascending: boolean) => {
    setLoader({
      ascending,
      descending: !ascending
    });

    const arr = newArray.slice();
    const { length } = arr;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setNewArray([...arr]);
        await setDelay(X_SHORT_DELAY_IN_MS);
        if (ascending) {
          if (arr[j].number > arr[j + 1].number) {
            swap<TColumns>(arr, j, j + 1);
            setNewArray([...arr]);
            await setDelay(X_SHORT_DELAY_IN_MS);
          }
        } else {
          if (arr[j].number < arr[j + 1].number) {
            swap<TColumns>(arr, j, j + 1);
            setNewArray([...arr]);
            await setDelay(X_SHORT_DELAY_IN_MS);
          }
        }
        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        setNewArray([...arr]);

      }
      arr[length - i - 1].state = ElementStates.Modified;
      setNewArray([...arr]);
      await setDelay(X_SHORT_DELAY_IN_MS);
    }
    setLoader({
      ascending: false,
      descending: false
    });
  }

  useEffect(() => {
    handleSetNewArray()
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <RadioInput
          label="Выбор"
          value="selection"
          name="sort-method"
          checked={selectedSort === 'selection'}
          disabled={loader.ascending || loader.descending}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedSort(e.target.value)}
        />
        <RadioInput
          label="Пузырек"
          value="bubble"
          name="sort-method"
          checked={selectedSort === 'bubble'}
          disabled={loader.ascending || loader.descending}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedSort(e.target.value)}
        />
        <div className={styles.wrapper}>
          <Button
            extraClass={styles.button}
            text="По возрастанию"
            disabled={loader.ascending || loader.descending}
            isLoader={loader.ascending}
            onClick={() => handleSorting(true)}
          />
          <Button
            extraClass={styles.button}
            text="По убыванию"
            disabled={loader.ascending || loader.descending}
            isLoader={loader.descending}
            onClick={() => handleSorting(false)}
          />
        </div>
        <Button
          text="Новый массив"
          disabled={loader.ascending || loader.descending}
          onClick={handleSetNewArray}
        />
      </div>
      <ul className={styles.list}>
        {newArray.map((item, index) => {
          return (
            <li key={index}>
              <Column
                index={item.number}
                state={item.state}
              />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
