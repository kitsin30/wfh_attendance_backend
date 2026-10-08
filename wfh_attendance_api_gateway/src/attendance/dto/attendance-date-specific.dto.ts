import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class AttendanceDateSpecificDto {
  @IsDate()
  @IsNotEmpty()
  attendanceDate: Date;

  @IsString()
  @IsNotEmpty()
  dateOrderBy: string
}