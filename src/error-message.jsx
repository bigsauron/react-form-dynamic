import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ formik, name }) => {
  return (
    <>
      {formik.touched[name] && formik.errors[name] &&
        (
          <div>{formik.errors[name]}</div>
        )
      }
    </>
  );
};

ErrorMessage.propTypes = {
  formik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};
ErrorMessage.displayName = 'ErrorMessage';
export default ErrorMessage;
