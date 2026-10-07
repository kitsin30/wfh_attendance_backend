import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";

@Entity('USERS')
export class AttendanceEntity {
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
}
