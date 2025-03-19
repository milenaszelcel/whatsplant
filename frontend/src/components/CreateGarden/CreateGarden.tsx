import { Field, Form, Formik } from "formik";
import styles from "./CreateGarden.module.scss";
import YardIcon from "@mui/icons-material/Yard";
import HouseIcon from "@mui/icons-material/House";
import ForestIcon from "@mui/icons-material/Forest";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useNavigate } from "react-router";
import { gardenValidationSchema } from "../../contract/src/schemas/gardenSchema";

interface GardenValues {
  name: string;
  type: string;
}

export const CreateGarden = () => {
  const initialValues: GardenValues = { name: "", type: "" };
  const navigate = useNavigate();
  const handleSubmit = async (values: GardenValues) => {
    const validatedValues = await gardenValidationSchema.validateAsync(values);
    try {
      const response = await axios.post(
        "http://localhost:3001/garden/",
        validatedValues,
        { withCredentials: true }
      );
      console.log(response);
      window.location.reload();
      navigate("/");
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
    <div className={styles.addGardenContainer}>
      <div className={styles.headText}>
        Create your <span className={styles.gold}>garden!</span>
      </div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={styles.addGardenForm}>
          <div className={styles.formFieldWithIcon}>
            <span className={styles.icon}>
              <YardIcon />
            </span>
            <Field
              name="name"
              placeholder={"Write name of your garden..."}
              className={styles.formField}
            />
          </div>
          <div className={styles.typeRadioContainer}>
            <div>Type:</div>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <Field type="radio" name="type" value="indoor" />
                <span className={styles.radioIcon}>
                  Indoor <HouseIcon fontSize="large" />
                </span>
              </label>
              <label className={styles.radioOption}>
                <Field
                  type="radio"
                  name="type"
                  value="outdoor"
                  className={styles.radioOption}
                />
                <span className={styles.radioIcon}>
                  Outdoor <ForestIcon fontSize="large" />
                </span>
              </label>
            </div>
          </div>

          <button type="button" className={styles.buttonWithIcon}>
            <AddIcon fontSize="large" /> Add plants
          </button>
          <button type="submit" className={styles.buttonWithIcon}>
            <SaveIcon fontSize="large" />
            Save Garden
          </button>
        </Form>
      </Formik>
    </div>
  );
};
