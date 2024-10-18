import { ApiPlant } from "../../../contract/src/types/apiPlant";
import Plant from "../../schemas/plantSchema";

export const createPlant = (apiPlant: ApiPlant) => {
  const id = apiPlant["id"];
  const commonName = apiPlant["common_name"];
  const scientificName = apiPlant["scientific_name"][0];
  const otherName = apiPlant["other_name"][0];
  const watering = apiPlant["watering"];
  const sunlight = apiPlant["sunlight"][0];
  const img = apiPlant["default_image"]?.["original_url"];

  const newPlant = new Plant({
    id: id,
    commonName: commonName,
    scientificName: scientificName,
    otherName: otherName,
    watering: watering,
    sunlight: sunlight,
    img: img,
  });
  return newPlant;
};
