import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Property } from "../../entities/property.entity";
import { AppError } from "../../errors/appError";

const listPropertiesByCategoryService = async (id: string) => {
  const categoriesRepository = AppDataSource.getRepository(Category);

  const categoryExists = await categoriesRepository.findOneBy({ id });

  if (!categoryExists) {
    throw new AppError("Category not found", 404);
  }

  // const properties = await propertiesRepository.find({
  //   where: {
  //     category: {
  //       id: category.id,
  //     },
  //   },
  //   relations: {
  //     category: true,
  //     property_user: true,
  //   },
  // });

  const category = await categoriesRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      properties: true,
    },
  });

  return category;
};

export default listPropertiesByCategoryService;
