import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";

@Entity('USERS')
export class UserEntity {
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
  updUid: string;

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
  userId: string;

  @Column({
    name: 'PASSWORD',
    type: 'varchar',
    precision: 255
  })
  password: string;

  @Column({
    name: 'RESET_PASS_FLG',
    type: 'char',
    precision: 1,
    default: 'N'
  })
  resetPassFlg: string;

  @Column({
    name: 'USER_LEVEL',
    type: 'number',
    precision: 1
  })
  userLevel: string;

}
