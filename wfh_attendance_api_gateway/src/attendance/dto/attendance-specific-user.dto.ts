import { IsString, IsNotEmpty } from 'class-validator';

export class AttendanceSpecificUser {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  attendanceDate: string;
}