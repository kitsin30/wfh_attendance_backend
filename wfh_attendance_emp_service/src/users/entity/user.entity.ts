import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";

@Entity('users')
export class users {
  @CreateDateColumn({
    name: 'CREATED_TMS',
    type: 'timestamp',
    precision: 3
  })
  createdTms: Date;

  @Column({
    name: 'UPD_UID',
    type: 'char',
    precision: 20
  })
  updUid: String;

  @UpdateDateColumn({
    name: 'UPDATED_TMS',
    type: 'timestamp',
    precision: 3
  })
  updatedTms: Date;

  @PrimaryColumn({
    name: 'USER_ID',
    type: 'char',
    precision: 20
  })
  userId: String;

  @Column({
    name: 'PASSWORD',
    type: 'varchar',
    precision: 255
  })
  password: String;

  @Column({
    name: 'RESET_PASS_FLG',
    type: 'char',
    precision: 1,
    default: 'N'
  })
  resetPassFlg: String;
}
