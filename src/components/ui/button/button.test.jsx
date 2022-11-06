import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';

describe('Check props button', () => {
  it('Button component text-props are displayed correctly', () => {
    // рендерим Button с текстом 
    const tree = renderer.create(<Button text={'test text'} />).toJSON();
    // проверяепм 
    expect(tree).toMatchSnapshot();
  });
//Функция it — это сокращенное имя для функции test.
  it('Button component are displayed correctly without props', () => {
    const tree = renderer.create(<Button />).toJSON();
    // expect дает вам доступ к ряду «сопоставителей», которые позволяют вам проверять разные вещи
    //toMatchSnapshot() сравнивает два снимка: ожидаемый (который был ранее записан в tree) и актуальный (который получился при текущем выполнении теста).
    expect(tree).toMatchSnapshot();
  });

  it('Button component disabled correctly', () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Button component loading-props are displayed correctly', () => {
    const tree = renderer.create(<Button isLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Button component onClick-props are displayed correctly', () => {
    //Имитация браузерного alert
    window.alert = jest.fn();
    // Рендерим компонент
    render(<Button onClick={() => window.alert('text')} text={'test text'} />)
    // Находим элемент ссылки
    const button = screen.getByText('test text');
    // Имитируем нажатие на ссылку
    fireEvent.click(button);
    // Проверяем, что alert сработал с правильным текстом предупреждения
    expect(window.alert).toHaveBeenCalledWith('text');
  })
});
