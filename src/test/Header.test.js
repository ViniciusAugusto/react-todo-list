import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header';

describe('Header', () => {
  it('should render h1 correctly', () => {
    const component = shallow(<Header />);
    const h1 = component.find('h1');
    expect(h1.text()).toEqual('React ToDo List')
  })
  it('should render correctly in "debug" mode', () => {    
    const component = shallow(<Header debug />);
    expect(component).toMatchSnapshot();
  });
});