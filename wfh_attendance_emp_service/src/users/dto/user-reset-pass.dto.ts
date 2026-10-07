import { IsString, IsNotEmpty } from 'class-validator';

export class UserResetPassDto {
  @IsString()
  @IsNotEmpty()
  userId: String;

  @IsString()
  @IsNotEmpty()
  password: String;

  @IsString()
  @IsNotEmpty()
  newPassword: String;
}