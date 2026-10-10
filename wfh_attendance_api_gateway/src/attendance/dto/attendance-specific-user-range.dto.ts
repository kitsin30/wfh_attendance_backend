import { IsString, IsNotEmpty } from 'class-validator';
import { AttendanceListRange } from './attendance-list-range.dto.js';

export class AttendanceSpecificUserRange extends AttendanceListRange {
  @IsString()
  @IsNotEmpty()
  userIdList: string[];

  @IsString()
  @IsNotEmpty()
  userOrderBy: string
}