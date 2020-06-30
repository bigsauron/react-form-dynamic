import React from 'react';
import { shallow } from 'enzyme';

import { Input } from '../src/input';

describe('Input', () => {
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
        handleChange: jest.fn(),
        handleBlur: jest.fn(),
        getFieldProps: jest.fn(),
      },
      inline: true,
      showError: true,
    };
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.length).toBe(1);
  });

  it('onChange', () => {
    const wrapper = shallow(<Input {...props} />);
    wrapper.find('input').simulate('change');
    expect(props.formik.handleChange).toHaveBeenCalled();
  });

  it('onChange with prop', () => {
    const p = { ...props };
    p.onChange = jest.fn();
    const wrapper = shallow(<Input {...p} />);
    wrapper.find('input').simulate('change');
    expect(p.formik.handleChange).toHaveBeenCalled();
    expect(p.onChange).toHaveBeenCalled();
  });

  it('onBlur', () => {
    const wrapper = shallow(<Input {...props} />);
    wrapper.find('input').simulate('blur');
    expect(props.formik.handleBlur).toHaveBeenCalled();
  });

  it('onBlur with prop', () => {
    const p = { ...props };
    p.onBlur = jest.fn();
    const wrapper = shallow(<Input {...p} />);
    wrapper.find('input').simulate('blur');
    expect(p.formik.handleBlur).toHaveBeenCalled();
    expect(p.onBlur).toHaveBeenCalled();
  });
});

