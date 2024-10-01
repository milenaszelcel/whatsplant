import Plant from "../schemas/plantSchema";

export type Filter = { search?: string };

export type Pagination = { page: number; perPage: number };

export const getListOfPlants = async (
  filter: Filter,
  pagination: Pagination
) => {
  const plants = await Plant.find({
    ...(filter.search && { $text: { $search: filter.search } }),
  })
    .sort({ id: 1 })
    .limit(pagination.perPage)
    .skip((pagination.page - 1) * pagination.perPage);

  return plants;
};
