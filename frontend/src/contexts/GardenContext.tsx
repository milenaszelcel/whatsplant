import { createContext, useEffect, useState } from "react";

import axios from "axios";
import type { Garden } from "@greenmate/contract";

type Props = {
  children: React.ReactNode;
};

export const GardenContext = createContext<Garden[] | null>(null);

export const GardenProvider = ({ children }: Props) => {
  const [gardens, setGardens] = useState<Garden[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/garden", {
          withCredentials: true,
        });

        setGardens(response.data.gardens);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <GardenContext.Provider value={gardens}>{children}</GardenContext.Provider>
  );
};
