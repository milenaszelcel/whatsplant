import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface MyFormValues {
  gardenName: string;
}

export const AddGarden = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (values: MyFormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/garden",
        values,
        { withCredentials: true }
      );

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
      <span onClick={() => {}}></span>

      {errorMessage}
    </>
  );
};
