import React from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        <div className={styles.wrapper}>
          <Input
            extraClass={styles.input}
            maxLength={4}
            max={4}
            isLimitText
            placeholder="Введите значение"
            // value={}
            // onChange={}
          />
          <Button
            text="Добавить в head"
            linkedList="small"
          // onClick={}
          // isLoader={}
          // disabled={}
          />
          <Button
            text="Добавить в tail"
            linkedList="small"
          // onClick={}
          // isLoader={}
          // disabled={}
          />
          <Button
            text="Удалить из head"
            linkedList="small"
          // onClick={}
          // isLoader={}
          // disabled={}
          />
          <Button
            text="Удалить из tail"
            linkedList="small"
          // onClick={}
          // isLoader={}
          // disabled={}
          />
        </div>
        <div className={styles.wrapper}>
          <Input
            extraClass={styles.input}
            placeholder="Введите индекс"
            // value={}
            // onChange={}
          />
          <Button
            text="Добавить по индексу"
            linkedList="big"
          // onClick={}
          // isLoader={}
          // disabled={}
          />
          <Button
            text="Удалить по индексу"
            linkedList="big"
          // onClick={}
          // isLoader={}
          // disabled={}
          />
        </div>
      </form>
      <ul className={styles.list}>
        <li className={styles.items}>
          <Circle extraClass={styles.circle}/>
          <Circle extraClass={styles.circle}/>
          <Circle extraClass={styles.circle}/>
          <Circle extraClass={styles.circle}/>
          <Circle extraClass={styles.circle}/>
        </li>
      </ul>
    </SolutionLayout>
  );
};
