import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddressDto {
  @IsString()
  @Length(8, 8, {
    message: 'the cep must have 8 characters',
  })
  @IsNotEmpty()
  cep: string;
  @IsString()
  state: string;
  @IsString()
  city: string;
  @IsString()
  neighborhood: string;
  @IsString()
  street: string;
  @IsString()
  number: string;
  @IsString()
  complement: string;
  @IsString()
  logradouro: string;
  @IsString()
  ibge: string;
  @IsString()
  gia: string;
  @IsString()
  ddd: string;
  @IsString()
  siafi: string;
}
