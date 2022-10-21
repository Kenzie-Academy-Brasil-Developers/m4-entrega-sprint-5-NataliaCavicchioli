import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Property } from "./property.entity";
import { User } from "./user.entity";

@Entity("schedules_users_properties")
export class User_Property {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  date: Date;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Property)
  @JoinColumn()
  property: Property;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
