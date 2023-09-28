import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';
import { Anddress } from '../@types/UserdataAnddress.type';
import { UserDataGithub } from '../@types/UserdataGithub.types';
import { UserHelpers } from './helpers';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserValidation } from '../pipes/UserValidation.pipe';
import { UserDto } from '../dto/User.dto';
import { UserCompletedDTO } from '../dto/AllUserDatas.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private userHelpers: UserHelpers,
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body(new UserValidation()) user: UserCompletedDTO,
    @Res() res: Record<string, any>,
  ) {
    const { data }: Record<string, any> = user;

    const cep: string = data.address.cep;
    const githubUser: string = data.githubUser;

    const address: Anddress = await this.userHelpers.webServiceViaCep(cep);
    const githubData: UserDataGithub = await this.userHelpers.webServiceGithub(
      githubUser,
    );

    const newUser: UserDto = this.userHelpers.modelsNewUserData(
      data,
      address,
      githubData,
    );

    this.userService.create(newUser);

    return res.status(201).json({
      message: 'successfully created user',
      data: { user: newUser },
    });
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Res() res: Record<string, any>) {
    this.userService.findAll();

    const users: User[] = await this.userService.findAll();

    return res.status(200).json({
      message: 'success',
      data: users,
    });
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Record<string, any>) {
    this.userService.findOne(id);

    const user: User = await this.userService.findOne(id);

    return res.status(200).json({
      message: 'success',
      data: { usersArray: user },
    });
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  async editing(
    @Body() request,
    @Param('id') id: string,
    @Res() res: Record<string, any>,
  ) {
    const editUserDto = request.data;

    if (editUserDto?.address?.cep) {
      const newDataAddress = await this.userHelpers.webServiceViaCep(
        editUserDto.address.cep,
      );
      editUserDto.address.state = newDataAddress.uf;
      editUserDto.address.city = newDataAddress.localidade;
      editUserDto.address.logradouro = newDataAddress.logradouro;
      editUserDto.address.ibge = newDataAddress.ibge;
      editUserDto.address.gia = newDataAddress.gia;
      editUserDto.address.ddd = newDataAddress.ddd;
      editUserDto.address.siafi = newDataAddress.siafi;

      this.userService.editing(editUserDto, id);
      return res.status(200).json({
        message: 'successfully updated',
        data: { dataUpdated: editUserDto },
      });
    }
    this.userService.editing(editUserDto, id);
    return res.status(200).json({
      message: 'successfully updated',
      data: { dataUpdated: editUserDto },
    });
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Record<string, any>) {
    this.userService.delete(id);
    return res.status(200).json({
      message: 'successfully deleted',
    });
  }
}
