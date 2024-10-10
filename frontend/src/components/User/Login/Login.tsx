import { registerValidationSchema } from "contract/schemas/registerSchema";
import { UserForm } from "../UserForm";
import { FormikValues } from "formik";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (values: FormikValues) => {
    try {
      const validatedValue = await registerValidationSchema.validateAsync(
        values
      );
      const response = await axios.post(
        "http://localhost:3001/users/login",
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
    <>
      <div>Login to your account</div>
      <UserForm onSubmit={onSubmit} />
      {errorMessage}
      <div>Don't have an account? Register below</div>
      <NavLink to="/signin">Sign In</NavLink>
    </>
  );
};
