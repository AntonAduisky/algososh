import renderer from 'react-test-renderer';

import { Circle } from './circle';


describe('Check props button', () => {
  it('Circle component are displayed correctly without props', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle component letter-props are displayed correctly', () => {
    const tree = renderer.create(<Circle letter={'test text'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle component head-props are displayed correctly', () => {
    const tree = renderer.create(<Circle head={'24'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle component head-props are displayed correctly with React-element in props', () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle component tail-props are displayed correctly', () => {
    const tree = renderer.create(<Circle tail={'24'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle component tail-props are displayed correctly with React-element in props', () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle component index-props are displayed correctly', () => {
    const tree = renderer.create(<Circle index={'24'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle component isSmall-props are displayed correctly', () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle component default-state-props are displayed correctly', () => {
    const tree = renderer.create(<Circle state={'default'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle component changing-state-props are displayed correctly', () => {
    const tree = renderer.create(<Circle state={'changing'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle component modified-state-props are displayed correctly', () => {
    const tree = renderer.create(<Circle state={'modified'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle component change-state-props are displayed correctly', () => {
    const tree = renderer.create(<Circle state={'change'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
