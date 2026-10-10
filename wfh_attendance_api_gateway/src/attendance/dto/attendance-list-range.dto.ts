import { IsString, IsNotEmpty } from 'class-validator';

export class AttendanceListRange {
  @IsString()
  @IsNotEmpty()
  attendanceDateStart: string;

  @IsString()
  @IsNotEmpty()
  attendanceDateEnd: string;

  @IsString()
  @IsNotEmpty()
  dateOrderBy: string
}