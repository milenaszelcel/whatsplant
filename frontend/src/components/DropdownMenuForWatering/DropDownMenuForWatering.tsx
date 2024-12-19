import { Field, Form, Formik } from "formik";
import styles from "./DropDownMenuForWatering.module.scss";

type Props = {
  handleSubmit: (waterValue: string) => void;
};

export const DropDownMenuForWatering = ({ handleSubmit }: Props) => {
  return (
    <>
      <Formik
        initialValues={{ waterValue: "" }}
        onSubmit={(values) => handleSubmit(values.waterValue)}
      >
        <Form>
          <div className={styles.wateringField}>
            <Field name="waterValue" placeholder="np. 300"></Field>
            <div>ml</div>
          </div>
          <button type="submit">Dodaj</button>
        </Form>
      </Formik>
    </>
  );
};
