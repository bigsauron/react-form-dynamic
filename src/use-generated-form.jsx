import React from 'react';

import { Input, Select, useForm } from './';

const UseGeneratedForm = (fields, onSubmit, options = {}) => {
  const formik = useForm({ fields, onSubmit, ...options });

  const children = fields.map((f) => {
    const {
      type,
      name,
      label,
      options,
      element,
      initialValue, // eslint-disable-line no-unused-vars
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
        key={name}
        {...props}
      />
    );
  });

  return [children, formik];

};


export default UseGeneratedForm;
