import {Body, Controller, Delete, Get, Inject, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AttendanceDto } from './dto/attendance.dto';
import { AttendanceSpecificUser } from './dto/attendance-specific-user.dto';
import { AttendanceSpecificUserRange } from './dto/attendance-specific-user-range.dto';
import { AttendanceDateSpecificDto } from './dto/attendance-date-specific.dto';
import { AttendanceListRange } from './dto/attendance-list-range.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttendanceAllRecSpecificUserDto } from './dto/attendance-all-rec-specific-user.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(
    @Inject('ATTENDANCE_SERVICE') private readonly attendanceService: ClientProxy,
  ) {}

  @Post('check-in')
  @UseInterceptors(
    FileInterceptor('attendanceImage', {
      dest: '../../image_emp',
    }),
  )
  checkIn(@Body() dto: AttendanceDto, @UploadedFile() file: any) {
    const attendanceData = {
      userId: dto.userId,
      attendanceImage: file.path,
    };
    return this.attendanceService.send(
      { cmd: 'check_in' },
      attendanceData,
    );
  }

  @Post('check-out')
  checkOut(@Body() dto: AttendanceDto) {
    return this.attendanceService.send(
      { cmd: 'check_out' },
      dto,
    );
  }

  @Post('get-specific-user')
  getUserAttendance(@Body() dto: AttendanceSpecificUser) {
    return this.attendanceService.send(
      { cmd: 'get_user_attend' },
      dto,
    );
  }

  @Post('get-user-all-attend')
  getSpecificAttendanceUser(@Body() dto: AttendanceAllRecSpecificUserDto) {
    return this.attendanceService.send(
      { cmd: 'get_user_all_attend' },
      dto,
    );
  }

  @Post('get-specific-user-attendance')
  getSpecificAttendanceUserInDateRange(@Body() dto: AttendanceSpecificUserRange) {
    return this.attendanceService.send(
      { cmd: 'get_user_attend_in_range' },
      dto,
    );
  }

  @Post('get-specific-date-attendance')
  getAllAttendanceForSpecificDate(@Body() dto: AttendanceDateSpecificDto) {
    return this.attendanceService.send(
      { cmd: 'get_all_attend_specific_date' },
      dto,
    );
  }

  @Post('get-specific-range-date-attendance')
  getAllAttendanceForRangeDate(@Body() dto: AttendanceListRange) {
    return this.attendanceService.send(
      { cmd: 'get_all_attend_range_date' },
      dto,
    );
  }

  @Get()
  getAllAttendance() {
    return this.attendanceService.send(
      { cmd: 'get_all_attend' },
      {},
    );
  }
}
