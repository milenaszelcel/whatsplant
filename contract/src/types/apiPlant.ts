export type ApiPlant = {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  indoor: boolean;
  watering:
    | "frequent"
    | "average"
    | "minimum"
    | "none"
    | "Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry";
  sunlight: Array<
    | "full_shade"
    | "part_shade"
    | "sun-part_shade"
    | "full_sun"
    | "filtered shade"
    | "part sun/part shade"
    | "sun"
    | "sheltered"
    | "deep shade"
    | "partial shade"
    | "partial sun shade"
    | "deciduous shade (spring sun)"
    | "shade"
    | "full sun only if soil kept moist"
    | "full sun partial sun"
    | "Full sun Partial sun Shade"
    | "Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry"
  >;
  default_image?: { original_url: string };
};
