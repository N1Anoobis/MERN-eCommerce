import React from 'react';
import { shallow } from 'enzyme';
import  ErrorDisplay  from './ErrorDisplay';

describe('Component ErrorDisplay', () => {
  it('should render without crashing', () => {
    const component = shallow(<ErrorDisplay />);
    expect(component).toBeTruthy();
  });
});
