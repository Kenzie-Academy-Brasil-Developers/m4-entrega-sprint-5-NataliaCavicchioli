import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Property } from "./property.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Property, (property) => property.category, { eager: true })
  properties: Property[];
}
