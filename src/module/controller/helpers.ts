import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Anddress } from '../@types/UserdataAnddress.type';
import { UserDataGithub } from '../@types/UserdataGithub.types';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserHelpers {
  constructor(private readonly httpService: HttpService) {}

  async webServiceViaCep(cep: string): Promise<Anddress> {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`).pipe(
        catchError(() => {
          throw 'An error happened viacep!';
        }),
      ),
    );
    return data;
  }
  async webServiceGithub(userName: String): Promise<UserDataGithub> {
    const { data: userData } = await firstValueFrom(
      this.httpService.get(`https://api.github.com/users/${userName}`).pipe(
        catchError(() => {
          throw 'An error Happened Github!';
        }),
      ),
    );
    const { data: repositories } = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/users/${userName}/repos`)
        .pipe(
          catchError(() => {
            throw 'An error Happened Github!';
          }),
        ),
    );
    const userDataGithub = {
      login: userData.login,
      id: userData.id,
      avatar: userData.avatar_url,
      url: userData.url,
      repos: [],
    };
    repositories?.map((rep) => {
      const arrayRepos = {
        id: rep.id,
        owner: rep.owner.login,
        full_name: rep.full_name,
        repo_url: rep.html_url,
      };
      userDataGithub.repos.push(arrayRepos);
    });

    return userDataGithub;
  }
  modelsNewUserData(
    createUserDto: CreateUserDto,
    address: Anddress,
    githubData: UserDataGithub,
  ): CreateUserDto {
    const newUser: CreateUserDto = {
      userId: createUserDto.userId,
      name: createUserDto.name,
      age: createUserDto.age,
      githubUser: createUserDto.githubUser,

      address: {
        cep: address.cep,
        state: address.uf,
        city: address.localidade,
        neighborhood: createUserDto.address.neighborhood,
        street: createUserDto.address.street,
        number: createUserDto.address.number,
        complement: createUserDto.address.complement,
        logradouro: address.logradouro,
        ibge: address.ibge,
        gia: address.gia,
        ddd: address.ddd,
        siafi: address.siafi,
      },
      githubData: {
        login: githubData.login,
        id: githubData.id,
        avatar: githubData.avatar,
        url: githubData.url,
        repos: [githubData],
      },
    };
    return newUser;
  }
}
