import React from 'react';
import { shallow } from 'enzyme';

import Select from '../src/select';

describe('Select', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'name',
      placeholder: 'John Smith',
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
      options: [{ value: 'value', label: 'label' }],
    };
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Select {...props} />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('option').at(0).text()).toBe('John Smith');
  });

  it('onChange', () => {
    const wrapper = shallow(<Select {...props} />);
    wrapper.find('select').simulate('change');
    expect(props.formik.handleChange).toHaveBeenCalled();
  });

  it('onChange with prop', () => {
    const p = { ...props };
    p.onChange = jest.fn();
    const wrapper = shallow(<Select {...p} />);
    wrapper.find('select').simulate('change');
    expect(p.formik.handleChange).toHaveBeenCalled();
    expect(p.onChange).toHaveBeenCalled();
  });

  it('onBlur', () => {
    const wrapper = shallow(<Select {...props} />);
    wrapper.find('select').simulate('blur');
    expect(props.formik.handleBlur).toHaveBeenCalled();
  });

  it('onBlur with prop', () => {
    const p = { ...props };
    p.onBlur = jest.fn();
    const wrapper = shallow(<Select {...p} />);
    wrapper.find('select').simulate('blur');
    expect(p.formik.handleBlur).toHaveBeenCalled();
    expect(p.onBlur).toHaveBeenCalled();
  });
});

