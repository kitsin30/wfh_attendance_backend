import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class AttendanceListRange {
  @IsDate()
  @IsNotEmpty()
  attendanceDateStart: Date;

  @IsDate()
  @IsNotEmpty()
  attendanceDateEnd: Date;

  @IsString()
  @IsNotEmpty()
  dateOrderBy: string
}