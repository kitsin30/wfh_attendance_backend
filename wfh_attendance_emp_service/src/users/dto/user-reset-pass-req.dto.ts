import { IsString, IsNotEmpty } from 'class-validator';

export class UserResetPassReqDto {
  @IsString()
  @IsNotEmpty()
  userId: String;
}