import React from 'react';
import { shallow } from 'enzyme';
import { SpecialRequestComponent } from './SpecialRequest';

describe('Component SpecialRequest', () => {
  it('should render without crashing', () => {
    const component = shallow(<SpecialRequestComponent />);
    expect(component).toBeTruthy();
  });
});
