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

  return (
    <>
      <div
        style={{
          ...(inline && {
            display: 'inline'
          }),
          ...styles.container,
        }}
        className={classes.container}
      >
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
            (!!formik.touched[name] && !!formik.errors[name] && 'error')
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
};
Select.displayName = 'Select';
export default Select;
