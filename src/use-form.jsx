import { useFormik } from 'formik';
import * as yup from 'yup';

const useForm = ({
  onSubmit = () => { },
  fields = [],
  validateOnMount = true,
  ...rest
}) => {
  const initialValues = {};
  const validation = {};
  for (let i = 0; i < fields.length; i++) {
    const {
      name,
      label = null,
      validations = [],
      validationType = 'string',
      initialValue = '',
    } = fields[i];

    initialValues[name] = initialValue;
    if (validations.length) {
      validation[name] = yup[validationType]();
      if (label) {
        validation[name] = validation[name].label(label);
      }
      for (let k = 0; k < validations.length; k++) {
        const { rule, params = [] } = validations[k];
        switch (rule) {
          case 'fields-match': {
            const [
              fieldToCompare,
              message = 'Fields don\'t match',
            ] = params;
            validation[name] = validation[name].test('fields-match', message, function (value) {
              return value === this.parent[fieldToCompare];
            });
            break;
          }
          default: {
            if (validation[name][rule]) {
              validation[name] = validation[name][rule](...params);
            }
            break;
          }
        }
      }
    }
  }
  const validationSchema = yup.object().shape(validation);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount,
    ...rest
  });
  return formik;
};

export default useForm;
