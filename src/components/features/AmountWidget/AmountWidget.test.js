import React from 'react';
import { shallow } from 'enzyme';
import { AmountWidgetComponent } from './AmountWidget';

describe('Component AmountWidget', () => {
  it('should render without crashing', () => {
    const component = shallow(<AmountWidgetComponent />);
    expect(component).toBeTruthy();
  });
});
