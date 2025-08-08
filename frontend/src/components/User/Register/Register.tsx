import type { FormikValues } from "formik";

import axios from "axios";
import { UserForm } from "../UserForm/UserForm";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../LoginRegistration.module.scss";
import { registerValidationSchema } from "@greenmate/contract";

export const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (values: FormikValues) => {
    try {
      const validatedValue = await registerValidationSchema.validateAsync(
        values
      );
      await axios.post("http://localhost:3001/users/", validatedValue, {
        withCredentials: true,
      });

      navigate("/");
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.message ||
          error.response?.statusText ||
          "An error occurred";
        setErrorMessage(errorMsg);
      } else {
        throw new Error("different error than axios");
      }
    }
  };
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <UserForm
          onSubmit={onSubmit}
          buttonValue="Sign up"
          formTitle="Sign up"
        />
        {errorMessage}
        <div className={styles.text}>
          <div>Have an account? Login below</div>
          <NavLink to="/signin" className={styles.siginRedirection}>
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
};
