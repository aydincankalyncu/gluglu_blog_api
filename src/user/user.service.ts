import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthCredentialsDto } from './dto/authCredentials-dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { Repository } from 'typeorm';
import { BaseResult } from 'src/utils/result/base-result';
import { SuccessResult } from 'src/utils/result/success-result';
import { ErrorResult } from 'src/utils/result/error-result';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: AuthCredentialsDto): Promise<BaseResult> {
    const { username, password, email } = createUserDto;
    // Hash password

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
      return new SuccessResult("User created successfully", user);
    } catch (error) {
      if (error.code === '23505') {
        return new ErrorResult(`Username ${username} already exists`, null);
      } else {
        return new ErrorResult("Error occured createuser method. " + error, error);
      }
    }
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<BaseResult> {
    const { username, password } = authCredentialsDto;
    const user: User = await this.userRepository.findOneBy({
      username: username,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };

      const accessToken = this.jwtService.sign(payload);
      return new SuccessResult("Login successfull", {accessToken: accessToken, user: user, isPasswordMatches: true});
    } else {
      return new ErrorResult("Please check your login credentials", {user: null});
    }
  }

  async testMethod(): Promise<string>{
    return "Test";
  }
}
