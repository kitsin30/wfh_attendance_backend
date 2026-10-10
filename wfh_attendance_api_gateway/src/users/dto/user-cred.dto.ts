import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UserCredDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  updUid: string;

  @IsNumber()
  @IsNotEmpty()
  userLevel: number;
}