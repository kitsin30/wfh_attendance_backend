import { IsString, IsNotEmpty } from 'class-validator';

export class AttendanceDateSpecificDto {
  @IsString()
  @IsNotEmpty()
  attendanceDate: string;

  @IsString()
  @IsNotEmpty()
  dateOrderBy: string
}