import { IsString, IsNotEmpty } from 'class-validator';

export class UserPassReqDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  updUid: string;
}