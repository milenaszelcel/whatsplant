import { Field, Form, Formik } from "formik";

interface MyFormValues {
  email: string;
  password: string;
}

type Props = {
  onSubmit: (values: MyFormValues) => void;
};

export const UserForm = ({ onSubmit }: Props) => {
  const initialValues: MyFormValues = { email: "", password: "" };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <Field
          id="email"
          name="email"
          placeholder="Enter your email"
          type="email"
        ></Field>
        <Field
          id="password"
          name="password"
          placeholder="Enter your password"
          type="password"
        ></Field>
        <button type="submit">Sign in</button>
      </Form>
    </Formik>
  );
};
