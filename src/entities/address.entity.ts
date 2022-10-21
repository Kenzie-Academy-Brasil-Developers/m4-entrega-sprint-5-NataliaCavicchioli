import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  district: string;

  @Column()
  zipCode: string;

  @Column({ nullable: true })
  number: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
