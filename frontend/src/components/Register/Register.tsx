import { Field, Form, Formik, FormikValues } from "formik";
import { registerValidationSchema } from "contract/schemas/registerSchema";
import axios from "axios";
interface MyFormValues {
  email: string;
  password: string;
}

export const Register = () => {
  const initialValues: MyFormValues = { email: "", password: "" };
  const onSubmit = async (values: FormikValues) => {
    const validatedValue = await registerValidationSchema.validateAsync(values);
    await axios.post("http://localhost:3001/users/register", validatedValue);
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Field id="email" name="email" placeholder="Enter your email"></Field>
          <Field
            id="password"
            name="password"
            placeholder="Enter your password"
          ></Field>
          <button type="submit">Sign in</button>
        </Form>
      </Formik>
    </div>
  );
};
