import { registerValidationSchema } from "../../../contract/src/schemas/registerSchema";
import { UserForm } from "../UserForm/UserForm";
import { FormikValues } from "formik";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../LoginRegistration.module.scss";

export const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (values: FormikValues) => {
    try {
      const validatedValue = await registerValidationSchema.validateAsync(
        values
      );

      const response = await axios.post(
        "http://localhost:3001/auth/login",
        validatedValue,
        { withCredentials: true }
      );

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
          buttonValue="Sign in"
          formTitle="Sign in"
        />
        {errorMessage}
        <div className={styles.text}>
          <div>Don't have an account? Register below</div>
          <NavLink to="/signup" className={styles.siginRedirection}>
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
};
