import { IsString, IsNotEmpty } from 'class-validator';

export class AttendanceDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  attendanceImage: string;
}