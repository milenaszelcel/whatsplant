import Joi from "joi";
import { ApiPlant } from "../types/apiPlant";

const plantValidateSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  common_name: Joi.string().required(),
  scientific_name: Joi.array().items(Joi.string()).required(),
  other_name: Joi.array().items(Joi.string()).required(),
  watering: Joi.string()
    .insensitive()
    .trim()
    .valid(
      "frequent",
      "average",
      "minimum",
      "none",
      "Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry"
    )
    .lowercase()
    .required(),
  sunlight: Joi.array()
    .items(
      Joi.string()
        .insensitive()
        .trim()
        .valid(
          "full shade",
          "part shade",
          "sun-part shade",
          "full sun",
          "filtered shade",
          "part sun/part shade",
          "sun",
          "sheltered",
          "deep shade",
          "partial shade",
          "partial sun shade",
          "deciduous shade (spring sun)",
          "shade",
          "full sun only if soil kept moist",
          "full sun partial sun",
          "Full sun Partial sun Shade",
          "Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry"
        )
        .lowercase()
    )
    .required(),
  default_image: Joi.object<ApiPlant["default_image"]>({
    original_url: Joi.string().required(),
  })
    .unknown()
    .empty(null)
    .allow(null),
})
  .unknown()
  .required();
