import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Anddress } from '../@types/UserdataAnddress.type';
import { UserDataGithub } from '../@types/UserdataGithub.types';
import { Injectable } from '@nestjs/common';

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
  modelsNewUserData(user, address: Anddress, githubData: UserDataGithub) {
    const newUser = {
      userId: user.userId,
      name: user.name,
      age: user.age,
      githubUser: user.githubUser,

      address: {
        cep: address.cep,
        state: address.uf,
        city: address.localidade,
        neighborhood: user.address.neighborhood,
        street: user.address.street,
        number: user.address.number,
        complement: user.address.complement,
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
