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
        {
          !!prepend && prepend
        }
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
        {
          !!append && append
        }
      </div>
      {showError &&
        <ErrorMessage
          formik={formik}
          name={name}
          className={classes.error}
          style={styles.error}
        />
      }
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
  prepend: PropTypes.node,
  append: PropTypes.node,
};
Input.defaultProps = {
  onChange: () => { },
  onBlur: () => { },
  showError: true,
  inline: false,
  styles: {},
  classes: {},
  mask: null,
  prepend: null,
  append: null,
};
Input.displayName = 'Input';
export default Input;
