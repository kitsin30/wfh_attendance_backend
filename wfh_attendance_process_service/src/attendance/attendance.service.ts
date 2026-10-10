import { Between, Entity, FindManyOptions, FindOptionsWhere, In } from 'typeorm';
import { Injectable, InternalServerErrorException, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AttendanceEntity } from './entity/attendance.entity.js';
import { AttendanceSpecificUser } from './dto/attendance-specific-user.dto.js';
import { AttendanceDto } from './dto/attendance.dto.js';
import { AttendanceSpecificUserRange } from './dto/attendance-specific-user-range.dto.js';
import { AttendanceDateSpecificDto } from './dto/attendance-date-specific.dto.js';
import { AttendanceListRange } from './dto/attendance-list-range.dto.js';
import { AttendanceAllRecSpecificUserDto } from './dto/attendance-all-rec-specific-user.dto.js';

@Injectable()
export class AttendanceService {
  constructor (
    @InjectRepository(AttendanceEntity)
    private readonly attendanceRepository: Repository<AttendanceEntity>,
  ) {}

  async checkIn(dto: AttendanceDto) {
    try {
      const currDate = new Date();

      const attend = this.attendanceRepository.create({
        userId: dto.userId,
        attendanceDate: currDate,
        startAttendTms: currDate,
        checkinImg: dto.attendanceImage
      })

      await this.attendanceRepository.save(attend);
      return {
        success: true,
        message: 'User Successfully created'
      };
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('User already attend today');
      }
      throw new InternalServerErrorException(`Failed to save attendance from user ${dto.userId}`);
    }
  }

  async checkOut(dto: AttendanceDto) {
    const currDate = new Date();

    const result = await this.attendanceRepository.update(
      {
        userId: dto.userId,
        attendanceDate: currDate
      }, {
        endAttendTms: currDate,
        checkoutImg: dto.attendanceImage
      }
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Record attendance not found for user id ${dto.userId} not found`);
    }

    return {
      success: true,
      message: 'Attendance Successfully updated'
    };
  }

  async getUserAttendance (dto: AttendanceSpecificUser) {
    const attend = await this.attendanceRepository.findOne({
      where: {
        userId: dto.userId,
        attendanceDate: dto.attendanceDate
      }
    })

    if (attend === null) {
      throw new NotFoundException(`Attendance for user id ${dto.userId} for date ${dto.attendanceDate} not found`);
    }
    
    return attend;
  }

  async getAttendance(cond: FindManyOptions<AttendanceEntity>, errMsg: string) {
    const attend = await this.attendanceRepository.find(cond);
    
    if (attend === null) {
      throw new NotFoundException(`'${errMsg}'`);
    }

    return attend;
  }

  async getSpecificAttendanceUser (dto: AttendanceAllRecSpecificUserDto) {
    const errMsg = `Attendance for user id ${dto.userId} not found`;

    const attend = await this.getAttendance(
      {
        where: {
          userId: dto.userId
        },
        order: {
          attendanceDate: dto.dateOrderBy === 'ASC'? 'ASC' : 'DESC',
        }
      }, errMsg
    )
    
    return attend;
  }

  async getSpecificAttendanceUserInDateRange (dto: AttendanceSpecificUserRange) {
    const errMsg = `Attendance for user id ${dto.userIdList} for range date between ${dto.attendanceDateStart} and ${dto.attendanceDateEnd} not found`;

    const attend = await this.getAttendance(
      {
        where: {
          userId: In(dto.userIdList),
          attendanceDate: Between (dto.attendanceDateStart, dto.attendanceDateEnd)
        },
        order: {
          attendanceDate: dto.dateOrderBy === 'ASC'? 'ASC' : 'DESC',
          userId: dto.userOrderBy === 'ASC'? 'ASC' : 'DESC'
        }
      }, errMsg
    )
    
    return attend;
  }

  async getAllAttendanceForSpecificDate(dto: AttendanceDateSpecificDto) {
    const errMsg = `All Attendance for date ${dto.attendanceDate} not found`;

    const attend = await this.getAttendance(
      {
        where: {
          attendanceDate: dto.attendanceDate
        },
        order: {
          attendanceDate: dto.dateOrderBy === 'ASC'? 'ASC' : 'DESC',
        }
      }, errMsg
    )

    return attend;
  }

  async getAllAttendanceForRangeDate(dto: AttendanceListRange) {
    const errMsg = `All Attendance for range date between ${dto.attendanceDateStart} and ${dto.attendanceDateEnd} not found`;
    const attend = await this.getAttendance(
      {
        where: {
          attendanceDate: Between (dto.attendanceDateStart, dto.attendanceDateEnd)
        },
        order: {
          attendanceDate: dto.dateOrderBy === 'ASC'? 'ASC' : 'DESC',
        }
      }, errMsg
    )

    return attend;
  }

  async getAllAttendance() {
    const attend = await this.attendanceRepository.find();
    
    if (attend === null) {
      throw new NotFoundException(`All Attendance not found`);
    }

    return attend;
  }
}