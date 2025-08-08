import { UserForm } from "../UserForm/UserForm";
import type { FormikValues } from "formik";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../LoginRegistration.module.scss";
import { registerValidationSchema } from "@greenmate/contract";
// import CloseIcon from "@mui/icons-material/Close";

export const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (values: FormikValues) => {
    try {
      const validatedValue = await registerValidationSchema.validateAsync(
        values
      );

      await axios.post("http://localhost:3001/auth/login", validatedValue, {
        withCredentials: true,
      });

      navigate("/");
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          error.response?.data ||
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
        {errorMessage && (
          <div className={styles.errorMessage}>
            {/* <CloseIcon className={styles.closeNotificationButton} /> */}
            {errorMessage}
          </div>
        )}

        <UserForm
          onSubmit={onSubmit}
          buttonValue="Sign in"
          formTitle="Sign in"
        />

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
