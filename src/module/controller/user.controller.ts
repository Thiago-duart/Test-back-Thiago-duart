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
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../schemas/user.schema';
import { EditUserDto } from '../dto/editUser.dto';
import { HttpService } from '@nestjs/axios';
import { Anddress } from '../@types/UserdataAnddress.type';
import { UserDataGithub } from '../@types/UserdataGithub.types';
import { CreateUserSchema, ZodValidationPipe } from '../pipes/User.pipe';
import { UserHelpers } from './helpers';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly httpService: HttpService,
    private userHelpers: UserHelpers,
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async create(@Body() request, @Res() res: Record<string, any>) {
    const createUserDto: CreateUserDto = request.data;

    const cep = createUserDto.address.cep;
    const userName = createUserDto.githubUser;

    const address: Anddress = await this.userHelpers.webServiceViaCep(cep);
    const githubData: UserDataGithub = await this.userHelpers.webServiceGithub(
      userName,
    );
    const newUser: CreateUserDto = this.userHelpers.modelsNewUserData(
      createUserDto,
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
    const editUserDto: EditUserDto = request.data;

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
