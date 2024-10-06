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
    .valid("frequent", "average", "minimum", "none")
    .required(),
  sunlight: Joi.array()
    .items(
      Joi.string().valid(
        "full_shade",
        "part_shade",
        "sun-part_shade",
        "full_sun"
      )
    )
    .required(),
  default_image: Joi.object<ApiPlant["default_image"]>({
    original_url: Joi.string().required(),
  }),
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
