import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class AttendanceDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  attendanceImage: string;

  @IsDate()
  @IsNotEmpty()
  attendanceDate: Date;
}