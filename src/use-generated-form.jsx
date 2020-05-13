import React from 'react';

import { Input, Select, useForm } from './';

const UseGeneratedForm = (fields, onSubmit, options = {}) => {
  const formik = useForm({ fields, onSubmit, ...options });

  const {
    classes: gClasses = {},
    styles: gStyles = {},
  } = options;

  const children = fields.map((f) => {
    const {
      type,
      name,
      label,
      options,
      element,
      classes = {},
      styles = {},
      initialValue, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      ...rest
    } = f;
    const props = {
      name,
      formik,
      label,
      ...rest
    };

    if (type === 'select') {
      return (
        <Select
          classes={{ ...gClasses.select, ...classes }}
          styles={{ ...gStyles.select, ...styles }}
          key={name}
          options={options}
          {...props}
        />
      );
    }
    if (type === 'element' && React.isValidElement(element)) {
      const key = name || JSON.stringify(element);
      return (
        { ...element, key }
      );
    }
    props.type = type;

    return (
      <Input
        classes={{ ...gClasses.input, ...classes }}
        styles={{ ...gStyles.input, ...styles }}
        key={name}
        {...props}
      />
    );
  });

  return [children, formik];

};


export default UseGeneratedForm;
