import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import ErrorMessage from './error-message';

import classnames from './classnames';

const Input = ({
  formik,
  name,
  onChange,
  onBlur,
  inline,
  showError,
  classes,
  styles,
  mask,
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

  const InputComponent = mask ? MaskedInput : 'input';

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
        <InputComponent
          style={{
            ...styles.input,
          }}
          mask={mask}
          name={name}
          {...formik.getFieldProps(name)}
          onChange={handleChange}
          onBlur={handleBlur}
          className={classnames([
            classes.input,
            (!!formik.touched[name] && !!formik.errors[name] && 'error')
          ])}
          {...other}
        />
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

Input.propTypes = {
  formik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  mask: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(RegExp)])),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  inline: PropTypes.bool.isRequired,
  showError: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  styles: PropTypes.object,
};
Input.defaultProps = {
  onChange: () => { },
  onBlur: () => { },
  showError: true,
  inline: false,
  styles: {},
  classes: {},
  mask: null,
};
Input.displayName = 'Input';
export default Input;
