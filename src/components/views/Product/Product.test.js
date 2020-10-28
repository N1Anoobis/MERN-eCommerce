import React from 'react';
import { shallow } from 'enzyme';
import { ProductComponent } from './Product';

describe('Component Productt', () => {
  it('should render without crashing', () => {
    const component = shallow(<ProductComponent />);
    expect(component).toBeTruthy();
  });
});
