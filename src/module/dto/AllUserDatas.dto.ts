import { ValidateNested } from 'class-validator';
import { UserDto } from './User.dto';
import { AddressDto } from './Address.dto';
import { GithubDto } from './Github.dto';

export class UserCompletedDTO {
  @ValidateNested()
  data?: {
    user: UserDto;
    address: AddressDto;
    Github: GithubDto;
  };
}
