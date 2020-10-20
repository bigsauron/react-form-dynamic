import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import ErrorMessage from './error-message';

import classnames from './classnames';

export const Input = ({
  inputRef,
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
  label,
  invalid,
  rows,
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

  const InputComponent = rows ? 'textarea' : mask !== null ? MaskedInput : 'input';

  const isError = invalid || (!!formik.touched[name] && !!formik.errors[name]);

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
        {!!label && <label className={classes.label}>{label}</label>}
        <InputComponent
          style={{
            ...styles.input,
          }}
          ref={inputRef}
          mask={mask}
          name={name}
          rows={rows}
          {...formik.getFieldProps(name)}
          onChange={handleChange}
          onBlur={handleBlur}
          className={classnames([
            classes.input,
            isError && (classes.inputError || 'error')
          ])}
          {...other}
        />
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

Input.propTypes = {
  formik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  mask: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(RegExp)
      ])
    ),
    PropTypes.bool,
  ]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  invalid: PropTypes.bool,
  inline: PropTypes.bool,
  showError: PropTypes.bool,
  classes: PropTypes.object,
  styles: PropTypes.object,
  prepend: PropTypes.node,
  append: PropTypes.node,
  label: PropTypes.string,
  rows: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
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
  inputRef: null,
  label: null,
  invalid: false,
  rows: null,
};
Input.displayName = 'Input';

export default React.forwardRef((props, ref) => (
  <Input inputRef={ref} {...props} />
));
