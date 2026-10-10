import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";

@Entity('USERS')
export class AttendanceEntity {
  @CreateDateColumn({
    name: 'CREATED_TMS',
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)'
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
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)'
  })
  updatedTms: Date;

  @PrimaryColumn({
    name: 'USER_ID',
    type: 'char',
    precision: 20
  })
  userId: string;

  @PrimaryColumn({
    name: 'ATTENDANCE_DATE',
    type: 'date'
  })
  attendanceDate: Date;

  @Column({
    name: 'START_ATTEND_TMS',
    type: 'timestamp',
    precision: 3
  })
  startAttendTms: Date;

  @Column({
    name: 'END_ATTEND_TMS',
    type: 'timestamp',
    precision: 3
  })
  endAttendTms: Date;

  @Column({
    name: 'CHECK_IN_IMG',
    type: 'varchar',
    precision: 500
  })
  checkinImg: string;

  @Column({
    name: 'CHECK_OUT_IMG',
    type: 'varchar',
    precision: 500
  })
  checkoutImg: string;

}
