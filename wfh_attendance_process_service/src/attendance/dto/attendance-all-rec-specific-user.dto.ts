import { IsNotEmpty, IsString } from "class-validator";

export class AttendanceAllRecSpecificUserDto {
    @IsString()
    @IsNotEmpty()
    userId: string;
  
    @IsString()
    @IsNotEmpty()
    dateOrderBy: string
}