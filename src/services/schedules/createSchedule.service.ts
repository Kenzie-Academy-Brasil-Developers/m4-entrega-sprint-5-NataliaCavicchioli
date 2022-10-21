import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";
import { User } from "../../entities/user.entity";
import { User_Property } from "../../entities/users_properties.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async (data: IScheduleRequest) => {
  const scheduleRepository = AppDataSource.getRepository(User_Property);
  const propertyRepository = AppDataSource.getRepository(Property);
  const userRepository = AppDataSource.getRepository(User);

  const schedules = await scheduleRepository.find();
  const properties = await propertyRepository.find();
  const user = await userRepository.findOneBy({ id: data.userId });

  const scheduleAlreadyExists = schedules.find(
    (schedule) => schedule.date && schedule.hour === data.hour && data.date
  );

  const property = properties.find((elem) => elem.id === data.propertyId);

  if (!property) {
    throw new AppError("Property was not found", 404);
  }

  if (scheduleAlreadyExists) {
    throw new AppError("This time is already booked", 400);
  }

  const validateHour = Number(data.hour.split(":")[0]);
  const validateMinutes = Number(data.hour.split(":")[1]);

  if (validateHour === 18 && validateMinutes > 0) {
    throw new AppError("Out of business hour", 400);
  }

  if (validateHour > 18 || validateHour < 8) {
    throw new AppError("Out of business hour", 400);
  }

  if (!user) {
    throw new AppError("User was not found", 404);
  }

  const dateObj = new Date(data.date);
  const weekday = dateObj.getDay();

  if (weekday === 0 || weekday === 6) {
    throw new AppError("Out of working days", 400);
  }

  const newSchedule = new User_Property();
  newSchedule.date = dateObj;
  newSchedule.hour = data.hour;
  newSchedule.property = property;
  newSchedule.user = user;

  await scheduleRepository.save(newSchedule);

  return newSchedule;
};

export default createScheduleService;
