import { Between, Entity, FindOptionsWhere } from 'typeorm';
import { Injectable, InternalServerErrorException, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { AttendanceEntity } from './entity/attendance.entity';
import { AttendanceSpecificUser } from './dto/attendance-specific-user.dto';
import { AttendanceDto } from './dto/attendance.dto';
import { AttendanceSpecificUserRange } from './dto/attendance-specific-user-range.dto';
import { AttendanceDateSpecificDto } from './dto/attendance-date-specific.dto';
import { AttendanceListRange } from './dto/attendance-list-range.dto';

@Injectable()
export class AttendanceService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
      throw new InternalServerErrorException(`Failed to save attendance from user '${dto.userId}'`);
    }
  }

  async checkOut(dto: AttendanceDto) {
    const currDate = new Date();

    const result = await this.attendanceRepository.update(
      {
        userId: dto.userId,
        attendanceDate: dto.attendanceDate
      }, {
        endAttendTms: currDate,
        checkoutImg: dto.attendanceImage
      }
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Record attendance not found for user id '${dto.userId}' not found`);
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
      throw new NotFoundException(`Attendance for user id '${dto.userId}' for date '${dto.attendanceDate}' not found`);
    }
    
    return attend
  }

  async getSpecificAttendanceUserInDateRange (dto: AttendanceSpecificUserRange) {
    const attend = await this.attendanceRepository.find({
      where: {
        userId: dto.userId,
        attendanceDate: Between (dto.attendanceDateStart, dto.attendanceDateEnd)
      },
      order: {
        attendanceDate: dto.dateOrderBy === 'ASC'? 'ASC' : 'DESC',
        userId: dto.userOrderBy === 'ASC'? 'ASC' : 'DESC',
      }
    })

    if (attend === null) {
      throw new NotFoundException(`Attendance for user id '${dto.userId}' for range date between '${dto.attendanceDateStart}' and '${dto.attendanceDateEnd}' not found`);
    }
    
    return attend
  }

  async getAllAttendanceForSpecificDate(dto: AttendanceDateSpecificDto) {
    const attend = await this.attendanceRepository.find({
      where: {
        attendanceDate: dto.attendanceDate
      },
      order: {
        attendanceDate: dto.dateOrderBy === 'ASC'? 'ASC' : 'DESC',
      }
    })

    if (attend === null) {
      throw new NotFoundException(`All Attendance for date '${dto.attendanceDate}' not found`);
    }
  }

  async getAllAttendanceForRangeDate(dto: AttendanceListRange) {
    const attend = await this.attendanceRepository.find({
      where: {
        attendanceDate: Between (dto.attendanceDateStart, dto.attendanceDateEnd)
      },
      order: {
        attendanceDate: dto.dateOrderBy === 'ASC'? 'ASC' : 'DESC',
      }
    })

    if (attend === null) {
      throw new NotFoundException(`All Attendance for range date between '${dto.attendanceDateStart}' and '${dto.attendanceDateEnd}' not found`);
    }
  }
}