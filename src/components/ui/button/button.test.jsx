import React from "react";
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "./button";

describe("Check props button", () => {
  it("Button props text", () => {
    const tree = renderer.create(<Button text={"Test"} />).toJSON();
    expect(tree).toMatchSnapshot(); // для генерации снепшота
  });

  it("button no text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot(); // для генерации снепшота
  });

  it("button disabled", () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot(); // для генерации снепшота
  });

  it("button isLoading", () => {
    const tree = renderer.create(<Button isLoader />).toJSON();
    expect(tree).toMatchSnapshot(); // для генерации снепшота
  });
  
  it('button callback', () => {
    
    window.alert = jest.fn();

        // Рендерим компонент
    render(<Button onClick={()=> window.alert('text')} text={'test text'}/>)

        // Находим элемент ссылки
      // eslint-disable-next-line no-restricted-globals
      const button = screen.getByText('test text');

        // Имитируем нажатие на ссылку
    fireEvent.click(button);
        
        // Проверяем, что alert сработал с правильным текстом предупреждения
    expect(window.alert).toHaveBeenCalledWith('text');
})
});
