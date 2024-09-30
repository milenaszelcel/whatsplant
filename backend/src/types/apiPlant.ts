export type ApiPlant = {
  id: number;
  common_name: string;
  other_name: string[];
  watering: "frequent" | "average" | "minimum" | "none";
  sunlight: Array<"full_shade" | "part_shade" | "sun-part_shade" | "full_sun">;
  default_image?: { original_url: string };
};
