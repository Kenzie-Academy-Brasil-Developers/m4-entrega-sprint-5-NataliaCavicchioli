import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Category } from "../../entities/category.entity";
import { Property } from "../../entities/property.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const addressRepository = AppDataSource.getRepository(Address);
  const categoryRepository = AppDataSource.getRepository(Category);

  const addresses = await addressRepository.find();
  const categories = await categoryRepository.find();

  const addressAlreadyExists = addresses.find(
    (elem) =>
      elem.city === address.city &&
      elem.district === address.district &&
      elem.state === address.state &&
      elem.zipCode === address.zipCode
  );

  const categoryExists = categories.find(
    (category) => category.id === categoryId
  );

  if (!categoryExists) {
    throw new AppError("Category not found", 404);
  }

  if (addressAlreadyExists) {
    throw new AppError("Address already exists", 400);
  }

  if (address.zipCode.length > 8) {
    throw new AppError("Zip Code must be less than 8 characteres", 400);
  }

  if (address.state.length > 2) {
    throw new AppError("State must be less than 2 characteres", 400);
  }

  await addressRepository.save(address);

  const newProperty = {
    value,
    size,
    address,
    category: categoryExists,
  };

  await propertyRepository.save(newProperty);

  return newProperty;
};

export default createPropertyService;
