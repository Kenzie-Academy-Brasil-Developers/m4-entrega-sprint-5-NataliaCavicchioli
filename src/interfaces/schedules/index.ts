import { Property } from "../../entities/property.entity";
import { User } from "../../entities/user.entity";

export interface IScheduleRequest {
  userId: string;
  propertyId: string;
  date: string;
  hour: string;
}
