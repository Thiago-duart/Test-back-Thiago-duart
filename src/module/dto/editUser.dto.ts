import { ObjectId } from 'mongoose';

export class EditUserDto {
  userId?: ObjectId;
  name?: string;
  age?: number;
  gitHubUser?: String;
  address?: {
    cep?: string;
    state?: string;
    city?: string;
    neighborhood?: string;
    street?: string;
    number?: string;
    complement?: string;
    logradouro?: string;
    ibge?: string;
    gia?: string;
    ddd?: string;
    siafi?: string;
  };
  githubData?: {
    login?: string;
    id?: number;
    avatar?: string;
    url?: string;
    repos?: Array<object>;
  };
}
