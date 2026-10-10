import { Body, ConflictException, Controller, Delete, Get, Inject, InternalServerErrorException, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';
import { AttendanceDto } from './dto/attendance.dto.js';
import { AttendanceSpecificUser } from './dto/attendance-specific-user.dto.js';
import { AttendanceSpecificUserRange } from './dto/attendance-specific-user-range.dto.js';
import { AttendanceDateSpecificDto } from './dto/attendance-date-specific.dto.js';
import { AttendanceListRange } from './dto/attendance-list-range.dto.js';
import { AttendanceAllRecSpecificUserDto } from './dto/attendance-all-rec-specific-user.dto.js';
import { catchError, throwError } from 'rxjs';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { diskStorage } from 'multer';

@Controller('attendance')
export class AttendanceController {
  private readonly imageDirectory: string;

  constructor(
    @Inject('ATTENDANCE_SERVICE') private readonly attendanceService: ClientProxy,

  ) {
    this.imageDirectory = join(
      process.cwd(),
      '..',
      'image_emp',
    );

    // Create the folder if it does not exist.
    if (!existsSync(this.imageDirectory)) {
      mkdirSync(this.imageDirectory, { recursive: true });
    }
  }

  @Post('check-in')
  @UseInterceptors(
    FileInterceptor('attendanceImage', {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          callback(null, join(process.cwd(), '..', 'image_emp'));
        },

        filename: (_req, file, callback) => {
          const filename =
            `${Date.now()}-${Math.round(Math.random() * 1e9)}` +
            extname(file.originalname).toLowerCase();

          callback(null, filename);
        },
      }),
    }),
  )
  checkIn(@Body() dto: AttendanceDto, @UploadedFile() file: Express.Multer.File) {
    const attendanceData = {
      userId: dto.userId,
      attendanceImage: file.path,
    };
    return this.attendanceService.send(
      { cmd: 'check_in' },
      attendanceData,
    ).pipe(
      catchError((error) => {
        if (error?.statusCode === 409) {
          return throwError(
            () => new ConflictException(error.message),
          );
        }

        return throwError(
          () => new InternalServerErrorException(
            error?.message || 'Internal server error',
          ),
        );
      })
    );
  }

  @Post('check-out')
  @UseInterceptors(
    FileInterceptor('attendanceImage', {
      dest: '../../image_emp',
    }),
  )
  checkOut(@Body() dto: AttendanceDto, @UploadedFile() file: any) {
    const attendanceData = {
      userId: dto.userId,
      attendanceImage: file.path,
    };
    return this.attendanceService.send(
      { cmd: 'check_out' },
      attendanceData,
    ).pipe(
      catchError((error) => {
        if (error?.statusCode === 409) {
          return throwError(
            () => new ConflictException(error.message),
          );
        }

        return throwError(
          () => new InternalServerErrorException(
            error?.message || 'Internal server error',
          ),
        );
      })
    );
  }

  @Post('get-specific-user')
  getUserAttendance(@Body() dto: AttendanceSpecificUser) {
    return this.attendanceService.send(
      { cmd: 'get_user_attend' },
      dto,
    ).pipe(
      catchError((error) => {
        if (error?.statusCode === 409) {
          return throwError(
            () => new ConflictException(error.message),
          );
        }

        return throwError(
          () => new InternalServerErrorException(
            error?.message || 'Internal server error',
          ),
        );
      })
    );
  }

  @Post('get-user-all-attend')
  getSpecificAttendanceUser(@Body() dto: AttendanceAllRecSpecificUserDto) {
    return this.attendanceService.send(
      { cmd: 'get_user_all_attend' },
      dto,
    ).pipe(
      catchError((error) => {
        if (error?.statusCode === 409) {
          return throwError(
            () => new ConflictException(error.message),
          );
        }

        return throwError(
          () => new InternalServerErrorException(
            error?.message || 'Internal server error',
          ),
        );
      })
    );
  }

  @Post('get-specific-user-attendance')
  getSpecificAttendanceUserInDateRange(@Body() dto: AttendanceSpecificUserRange) {
    return this.attendanceService.send(
      { cmd: 'get_user_attend_in_range' },
      dto,
    ).pipe(
      catchError((error) => {
        if (error?.statusCode === 409) {
          return throwError(
            () => new ConflictException(error.message),
          );
        }

        return throwError(
          () => new InternalServerErrorException(
            error?.message || 'Internal server error',
          ),
        );
      })
    );
  }

  @Post('get-specific-date-attendance')
  getAllAttendanceForSpecificDate(@Body() dto: AttendanceDateSpecificDto) {
    return this.attendanceService.send(
      { cmd: 'get_all_attend_specific_date' },
      dto,
    ).pipe(
      catchError((error) => {
        if (error?.statusCode === 409) {
          return throwError(
            () => new ConflictException(error.message),
          );
        }

        return throwError(
          () => new InternalServerErrorException(
            error?.message || 'Internal server error',
          ),
        );
      })
    );
  }

  @Post('get-specific-range-date-attendance')
  getAllAttendanceForRangeDate(@Body() dto: AttendanceListRange) {
    return this.attendanceService.send(
      { cmd: 'get_all_attend_range_date' },
      dto,
    ).pipe(
      catchError((error) => {
        if (error?.statusCode === 409) {
          return throwError(
            () => new ConflictException(error.message),
          );
        }

        return throwError(
          () => new InternalServerErrorException(
            error?.message || 'Internal server error',
          ),
        );
      })
    );
  }

  @Get()
  getAllAttendance() {
    return this.attendanceService.send(
      { cmd: 'get_all_attend' },
      {},
    ).pipe(
      catchError((error) => {
        if (error?.statusCode === 409) {
          return throwError(
            () => new ConflictException(error.message),
          );
        }

        return throwError(
          () => new InternalServerErrorException(
            error?.message || 'Internal server error',
          ),
        );
      })
    );
  }
}
