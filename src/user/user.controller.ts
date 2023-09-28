import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/authCredentials-dto';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { BaseResult } from 'src/utils/result/base-result';

@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<BaseResult> {
    return this.authService.createUser(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<BaseResult> {
    return this.authService.login(authCredentialsDto);
  }
}
