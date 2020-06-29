import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './error-message';

import classnames from './classnames';

const Select = ({
  formik,
  name,
  onChange,
  onBlur,
  options,
  placeholder,
  inline,
  showError,
  classes,
  styles,
  prepend,
  append,
  ...other
}) => {
  const handleChange = (event) => {
    formik.handleChange(event);
    if (onChange) {
      onChange(event);
    }
  };

  const handleBlur = (event) => {
    formik.handleBlur(event);
    if (onBlur) {
      onBlur(event);
    }
  };

  const opts = [...options];

  if (placeholder) {
    opts.unshift({
      label: placeholder,
      value: '',
    });
  }

  const isError = !!formik.touched[name] && !!formik.errors[name];

  return (
    <>
      <div
        style={{
          ...(inline && {
            display: 'inline'
          }),
          ...styles.container,
        }}
        className={classnames([
          classes.container,
          isError && (classes.containerError || 'error')
        ])}
      >
        {
          !!prepend && prepend
        }
        <select
          style={{
            ...styles.select,
          }}
          name={name}
          {...formik.getFieldProps(name)}
          onChange={handleChange}
          onBlur={handleBlur}
          className={classnames([
            classes.select,
            isError && (classes.inputError || 'error')
          ])}
          {...other}
        >
          {
            opts.map((o, i) => (
              <option
                key={i}
                value={o.value}
                style={{
                  ...styles.option,
                }}
                className={classes.option}
              >
                {o.label}
              </option>
            ))
          }
        </select>
        {
          !!append && append
        }
        {showError &&
          <ErrorMessage
            formik={formik}
            name={name}
            className={classes.error}
            style={styles.error}
          />
        }
      </div>
    </>
  );
};

Select.propTypes = {
  formik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  inline: PropTypes.bool.isRequired,
  showError: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  styles: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    label: PropTypes.string.isRequired,
  })),
  prepend: PropTypes.node,
  append: PropTypes.node,
};
Select.defaultProps = {
  onChange: () => { },
  onBlur: () => { },
  options: [],
  placeholder: '',
  showError: true,
  inline: false,
  styles: {},
  classes: {},
  prepend: null,
  append: null,
};
Select.displayName = 'Select';
export default Select;
