import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { AttendanceListRange } from './attendance-list-range.dto';

export class AttendanceSpecificUserRange extends AttendanceListRange {
  @IsString()
  @IsNotEmpty()
  userIdList: string[];

  @IsString()
  @IsNotEmpty()
  userOrderBy: string
}