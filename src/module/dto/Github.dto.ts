import { IsArray, IsString } from 'class-validator';

export class GithubDto {
  @IsString()
  login: string;
  @IsString()
  id: number;
  @IsString()
  avatar: string;
  @IsString()
  url: string;
  @IsArray()
  repos: Array<object>;
}
