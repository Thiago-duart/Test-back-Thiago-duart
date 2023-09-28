import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty({ message: 'must contain name' })
  name: string;
  @IsString()
  @IsNotEmpty({ message: 'must contain email' })
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty({ message: 'must contain password' })
  @Matches(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    'g',
    {
      each: true,
      message: (v) => `${v.value} is illegal in ${v.property}`,
    },
  )
  password: string;
}
export class loginAuthDto {
  email: string;
  password: string;
}
