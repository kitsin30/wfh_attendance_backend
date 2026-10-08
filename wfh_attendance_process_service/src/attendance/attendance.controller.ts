import { Controller } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './dto/attendance.dto';
import { AttendanceSpecificUser } from './dto/attendance-specific-user.dto';
import { AttendanceSpecificUserRange } from './dto/attendance-specific-user-range.dto';
import { AttendanceDateSpecificDto } from './dto/attendance-date-specific.dto';
import { AttendanceListRange } from './dto/attendance-list-range.dto';

@Controller()
export class AttendanceController {
  constructor (
    private readonly attendanceService: AttendanceService
  ) {}

  @MessagePattern({ cmd: 'check_in' })
  async checkIn(@Payload() dto: AttendanceDto) {
    return this.attendanceService.checkIn(dto);
  }

  @MessagePattern({ cmd: 'check_out' })
  async checkOut(@Payload() dto: AttendanceDto) {
    return this.attendanceService.checkOut(dto);
  }

  @MessagePattern({ cmd: 'get_user_attend' })
  async getUserAttendance(@Payload() dto: AttendanceSpecificUser) {
    return this.attendanceService.getUserAttendance(dto);
  }

  @MessagePattern({ cmd: 'get_user_attend_in_range' })
  async getSpecificAttendanceUserInDateRange(@Payload() dto: AttendanceSpecificUserRange) {
    return this.attendanceService.getSpecificAttendanceUserInDateRange(dto);
  }

  @MessagePattern({ cmd: 'get_all_attend_specific_date' })
  async getAllAttendanceForSpecificDate(@Payload() dto: AttendanceDateSpecificDto) {
    return this.attendanceService.getAllAttendanceForSpecificDate(dto);
  }

  @MessagePattern({ cmd: 'get_all_attend_range_date' })
  async getAllAttendanceForRangeDate(@Payload() dto: AttendanceListRange) {
    return this.attendanceService.getAllAttendanceForRangeDate(dto);
  }

  @MessagePattern({ cmd: 'get_all_attend' })
  async getAllAttendance() {
    return this.attendanceService.getAllAttendance();
  }
}