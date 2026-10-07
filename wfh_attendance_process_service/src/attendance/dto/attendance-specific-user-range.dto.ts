import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class AttendanceSpecificUserRange {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDate()
  @IsNotEmpty()
  attendanceDateStart: Date;

  @IsDate()
  @IsNotEmpty()
  attendanceDateEnd: Date;
}