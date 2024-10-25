import axios from "axios";
import { useEffect } from "react";

export const Garden = () => {
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(
          "http://localhost:3001/garden/getGarden",
          {
            params: { id: id },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData("13424");
  });
};
