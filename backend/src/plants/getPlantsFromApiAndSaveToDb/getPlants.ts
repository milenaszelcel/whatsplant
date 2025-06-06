import { addPlantToDb } from "./addPlantToDb";
import { getPlantsData } from "./getPlantsData";
import helpfulVariables from "../../schemas/helpfulVariablesSchema";
import { plantValidationSchema, type ApiPlant } from "@greenmate/contract";

type PlantData = { apiPlant: ApiPlant; page: number };

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
        const apiPlant = await plantValidationSchema.validateAsync(item);
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
