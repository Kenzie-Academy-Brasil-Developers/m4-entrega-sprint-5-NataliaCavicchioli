import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";

const listPropertiesService = async (): Promise<Property[]> => {
  const propertyRepository = AppDataSource.getRepository(Property);

  const properties = await propertyRepository.find({
    relations: { category: true },
  });

  return properties;
};

export default listPropertiesService;
