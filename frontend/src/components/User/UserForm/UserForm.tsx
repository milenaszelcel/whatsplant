import { Field, Form, Formik } from "formik";
import styles from "./UserForm.module.scss";
interface MyFormValues {
  email: string;
  password: string;
}

type Props = {
  onSubmit: (values: MyFormValues) => void;
  buttonValue: String;
};

export const UserForm = ({ onSubmit, buttonValue }: Props) => {
  const initialValues: MyFormValues = { email: "", password: "" };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className={styles.form}>
        <div className={styles.formItem}>
          <label htmlFor="email" className={styles.label}>
            E-mail
          </label>
          <Field
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            className={styles.field}
          ></Field>
        </div>
        <div className={styles.formItem}>
          <label htmlFor="email" className={styles.label}>
            Password
          </label>
          <Field
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            className={styles.field}
          ></Field>
        </div>

        <button type="submit" className={styles.submitButton}>
          {buttonValue}
        </button>
      </Form>
    </Formik>
  );
};
