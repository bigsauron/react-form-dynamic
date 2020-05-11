import React from 'react';
import { shallow } from 'enzyme';

import ErrorMessage from '../src/error-message';

describe('ErrorMessage', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'name',
      formik: {
        touched: {
          name: true,
        },
        errors: {
          name: 'Some error',
        },
        values: {},
      },
    };
  });

  it('renders correctly', () => {
    const wrapper = shallow(<ErrorMessage {...props} />);
    expect(wrapper.length).toBe(1);
  });
});

