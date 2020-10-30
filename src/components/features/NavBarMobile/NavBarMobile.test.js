import React from 'react';
import { shallow } from 'enzyme';
import { NavBarMobileComponent } from './NavBarMobile';

describe('Component NavBarMobile', () => {
  it('should render without crashing', () => {
    const component = shallow(<NavBarMobileComponent />);
    expect(component).toBeTruthy();
  });
});
