import { Field, Form, Formik, type FormikValues } from "formik";
import styles from "./FieldWithButtonForm.module.scss";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

type Props<Values extends FormikValues> = {
  initialValues: Values;
  placeHolder: string;
  handleSubmit: (values: Values) => void;
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
};

export const FieldWithButtonForm = <Values extends FormikValues>({
  initialValues,
  handleSubmit,
  placeHolder,
  name,
  icon: IconComponent,
}: Props<Values>) => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={styles.searchForm}>
        <Field
          name={name}
          placeholder={placeHolder}
          className={styles.searchInput}
        ></Field>

        <button className={styles.searchButton} type="submit">
          <span className={styles.icon}>
            <IconComponent fontSize="large" />
          </span>
        </button>
      </Form>
    </Formik>
  );
};
