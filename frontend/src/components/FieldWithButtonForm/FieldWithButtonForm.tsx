import { Field, Form, Formik, FormikValues } from "formik";

import styles from "./FieldWithButtonForm.module.scss";
import { Link } from "react-router-dom";

type Props<Values extends FormikValues> = {
  initialValues: Values;
  placeHolder: string;
  handleSubmit: (values: Values) => void;
  name: string;
  icon: JSX.Element;
};

export const FieldWithButtonForm = <Values extends FormikValues>({
  initialValues,
  handleSubmit,
  placeHolder,
  name,
  icon,
}: Props<Values>) => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={styles.searchForm}>
        <Field
          name={name}
          placeholder={placeHolder}
          className={styles.searchInput}
        ></Field>

        <button type="submit" className={styles.searchButton}>
          <span className={styles.icon}>{icon}</span>
        </button>
      </Form>
    </Formik>
  );
};
