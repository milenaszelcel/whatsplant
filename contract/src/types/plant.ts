export type Plant = {
  id: number;
  commonName: string;
  scientificName: string;
  otherName: string;
  watering: "frequent" | "average" | "minimum" | "none";
  sunlight: "full_shade" | "part_shade" | "sun-part_shade" | "full_sun";
  img?: string;
  indoor: boolean;
  description: string;
};
