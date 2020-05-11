### Generate form from JSON

Declare fields
```js
const fields = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    validations: [
      {
        rule: 'required',
        params: ['Required'],
      }
    ],
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    validations: [
      {
        rule: 'required',
      },
      {
        rule: 'email',
        params: ['Incorrect email'],
      },
    ],
  },
  {
    name: 'password1',
    label: 'Password',
    type: 'password',
    validations: [
      {
        rule: 'required',
      },
      {
        rule: 'min',
        params: [2, 'Too short'],
      },
      {
        rule: 'max',
        params: [8, 'Too Long'],
      },
    ],
  },
  {
    name: 'password2',
    label: 'Password',
    type: 'password',
    validations: [
      {
        rule: 'fields-match',
        params: ['password1', 'Do not much'],
      },
    ],
  },
  {
    name: 'state',
    label: 'State',
    type: 'select',
    options: states.map(s => ({ value: s.abbr, label: s.name })),
    validations: [
      {
        rule: 'required',
      },
    ],
  },
  {
    name: 'submit',
    label: 'Submit',
    type: 'element',
    element: (<button>submit</button>),
  },
];

```

Use hook
```js
import { useGeneratedForm } from 'react-form-dynamic';
const App = () => {
  const handleSubmit = () => {
    console.log('Form submitted!');
  };
  const [formElements, formik] = useGeneratedForm(fields, handleSubmit);
  return (
    <form onSubmit={formik.handleSubmit}>
      {formElements}
    </form>
  );
};
```

### useForm hook
You can generate form manualy using useForm hook
```js
import { useForm } from 'react-form-dynamic';

const fields = [
  {
    name: 'firstName',
    label: 'First Name',
    validations: [
      {
        rule: 'required',
        params: ['Required'], // Error message will be "First Name is a required field"
      }
    ],
  },
  {
    name: 'lastName',
    label: 'Last Name',
    validations: [
      {
        rule: 'required',
        params: ['Required', 'Last Name is strictly required'], // Custom error message
      }
    ],
  },
];

const App = () => {
  const onSubmit = () => {
    console.log('Form submitted!');
  };
  const formik = useForm({fields, onSubmit});
  return (
    <form onSubmit={formik.handleSubmit}>
      <Input name="firstName" formik={formik}>
      <Input name="lastName" formik={formik}>
    </form>
  );
};
```

### fields structure

#### fields

| Field       | Description                              |                                         |
|-------------|------------------------------------------|-----------------------------------------|
| type        | Type of the form element                 | select, text, number, email, element... |
| name        | Name of the element.Also used as a key   |                                         |
| initialValue| Default value of the field               |                                         |
| label       | Label of the form element                |                                         |
| validations | An array with the list of validations    |                                         |
| element     | React.element. Used when type is element | Ex. ``` (<button>submit</button>)```           |

#### validation

| Field  | Description                                     |                                                      |
|--------|-------------------------------------------------|------------------------------------------------------|
| rule   | Validation rule's name. Mostly using yup rules. | Possible values: required, min, max, fields-match... |
| params | Param for rule. Can be custom error message.    |                                                      |