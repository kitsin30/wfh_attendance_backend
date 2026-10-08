import { IsString, IsNotEmpty } from 'class-validator';

export class UserForgetPassDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}