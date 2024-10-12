import { ApiPlant } from "../../types/apiPlant";
import { addPlantToDb } from "./addPlantToDb";
import { getPlantsData } from "./getPlantsData";
import helpfulVariables from "../../schemas/helpfulVariablesSchema";
import Joi from "joi";

type PlantData = { apiPlant: ApiPlant; page: number };

const validateSchema = Joi.object<ApiPlant>({
  id: Joi.number().integer().positive().required(),
  common_name: Joi.string().required(),
  scientific_name: Joi.array().items(Joi.string()).required(),
  other_name: Joi.array().items(Joi.string()).required(),
  watering: Joi.string()
    .insensitive()
    .trim()
    .valid("frequent", "average", "minimum", "none")
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
          "Full sun Partial sun Shade"
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

export const getPlants = async () => {
  let lastPlantId;
  let lastPage;

  try {
    for await (const { apiPlant, page } of getAllPlants()) {
      tryToAddPlantToDb(apiPlant);

      lastPlantId = apiPlant.id;
      lastPage = page;
    }
  } catch (error) {
    const newHelpfulVariables = new helpfulVariables({
      name: "Last Update of Plants",
      lastPage: lastPage,
      lastPlantId: lastPlantId,
    });
    console.error(error);

    await helpfulVariables.findOneAndReplace(
      { name: "Last Update of Plants" },
      newHelpfulVariables,
      { upsert: true }
    );
  }
};

async function* getAllPlants(): AsyncIterable<PlantData> {
  let isNextPage = true;
  const variables = await helpfulVariables.findOne({
    name: "Last Update of Plants",
  });

  let page = variables?.lastPage || 1;
  let lastId = variables?.lastPlantId || 0;

  while (isNextPage === true) {
    const data = await getPlantsData(page);
    if (data["last_page"] >= page) {
      page += 1;

      for (const item of data["data"]) {
        const apiPlant = await validateSchema.validateAsync(item);
        console.log(apiPlant);
        if (apiPlant.id > lastId) {
          yield { apiPlant, page };
        }
      }
    } else {
      isNextPage = false;
    }
  }
}

const tryToAddPlantToDb = async (apiPlant: ApiPlant) => {
  try {
    await addPlantToDb(apiPlant);
  } catch (err) {
    console.log(err);
  }
};
