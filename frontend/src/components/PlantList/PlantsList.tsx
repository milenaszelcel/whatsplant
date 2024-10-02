import { Plant } from "contract/plant";
import { PlantBox } from "../PlantBox/PlantBox";

type Props = {
  plants: Plant[];
};

export const PlantsList = ({ plants }: Props) => {
  return (
    <div>
      {plants.map((plant) => (
        <PlantBox plant={plant} key={plant.id} />
      ))}
    </div>
  );
};
