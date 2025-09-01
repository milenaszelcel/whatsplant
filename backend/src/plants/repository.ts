import Plant from "../schemas/plantSchema";

export type Filter = { search?: string };

export type Pagination = { page: number; perPage: number };

export const getListOfPlants = async (
  filter: Filter,
  pagination: Pagination
) => {
  const queryCondition = filter.search
    ? { $text: { $search: filter.search } }
    : {};

  const countPromise = Plant.countDocuments(queryCondition);

  const dataPromise = Plant.find(queryCondition)
    .sort({ id: 1 })
    .limit(pagination.perPage)
    .skip((pagination.page - 1) * pagination.perPage);

  const [total, plants] = await Promise.all([countPromise, dataPromise]);

  return { plants, total };
};
