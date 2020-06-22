import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ formik, name, className, style }) => {
  return (
    <>
      {formik.touched[name] && formik.errors[name] &&
        (
          <div className={className} style={style}>{formik.errors[name]}</div>
        )
      }
    </>
  );
};

ErrorMessage.propTypes = {
  formik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};
ErrorMessage.defaultProps = {
  className: 'error-message',
  style: {},
};
ErrorMessage.displayName = 'ErrorMessage';
export default ErrorMessage;
