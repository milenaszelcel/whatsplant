import { Field, Form, Formik } from "formik";
import styles from "./CreateGarden.module.scss";
import { useState } from "react";
import axios from "axios";

interface GardenValues {
  name: string;
  type: string;
}

export const CreateGarden = () => {
  const initialValues: GardenValues = { name: "", type: "" };

  const handleSubmit = async (values: GardenValues) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/garden/",
        values,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.message ||
          error.response?.statusText ||
          "An error occurred";
      } else {
        throw new Error("different error than axios");
      }
    }
  };

  return (
    <div className={styles.addGardenForm}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div>Name</div>
          <Field name="name" />
          <div>Type</div>
          <Field type="radio" name="type" value="outdoor" />
          <Field type="radio" name="type" value="indoor" />
          <div>Add your first plants</div>
          <button type="button">Add plants</button>
          <button type="submit">Save Garden</button>
        </Form>
      </Formik>
    </div>
  );
};
