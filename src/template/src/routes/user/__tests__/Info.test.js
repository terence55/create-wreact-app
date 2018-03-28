import React from 'react';
import { shallow } from 'enzyme';
import Info from '../components/Info';

describe('Info', () => {
  it('renders without crashing', () => {
    shallow(<Info />);
  });

  it('render correct content', () => {
    const testContent = 'Test Content';
    const wrapper = shallow(<Info>{testContent}</Info>);
    expect(wrapper.contains(testContent)).toEqual(true);
  });
});
