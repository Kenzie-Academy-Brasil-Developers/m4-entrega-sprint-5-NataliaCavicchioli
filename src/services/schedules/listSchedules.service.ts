import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";
import { User_Property } from "../../entities/users_properties.entity";
import { AppError } from "../../errors/appError";

const listSchedulesService = async (id: string) => {
  const scheduleRepository = AppDataSource.getRepository(User_Property);
  const propertyRepository = AppDataSource.getRepository(Property);

  const properties = await propertyRepository.find();
  const property = properties.find((elem) => elem.id === id);

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  const schedules = await scheduleRepository.find({
    where: {
      property: {
        id: id,
      },
    },
    relations: { property: true, user: true },
  });

  return schedules;
};

export default listSchedulesService;
