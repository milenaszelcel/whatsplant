import { FormikValues } from "formik";
import { registerValidationSchema } from "contract/schemas/registerSchema";
import axios from "axios";
import { UserForm } from "../UserForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { error } from "console";

export const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (values: FormikValues) => {
    try {
      const validatedValue = await registerValidationSchema.validateAsync(
        values
      );
      const response = await axios.post(
        "http://localhost:3001/users/register",
        validatedValue,
        { withCredentials: true }
      );
      console.log(document.cookie);
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
      <div>Register</div>
      <UserForm onSubmit={onSubmit} />
      {errorMessage}
    </>
  );
};
