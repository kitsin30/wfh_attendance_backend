import { IsString, IsNotEmpty } from 'class-validator';

export class UserCredDto {
  @IsString()
  @IsNotEmpty()
  userId: String;

  @IsString()
  @IsNotEmpty()
  password: String;
}