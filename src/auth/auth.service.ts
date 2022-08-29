import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUser } from './dao/appuser.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AppUser)
    private appUserRepository: Repository<AppUser>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, email } = authCredentialsDto;

    if (await this.findUser(username)) {
      throw new ConflictException('Duplicate username');
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.appUserRepository.create({
      username,
      password: hashedPassword,
      email,
    });

    await this.appUserRepository.save(user);
  }

  async signIn(authLoginDto: AuthLoginDto): Promise<{ accessToken: string }> {
    const { username, password } = authLoginDto;

    const foundUser = await this.findUser(username);
    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Failed to login');
    }
  }

  private async findUser(username: string): Promise<AppUser | null> {
    const found = await this.appUserRepository
      .createQueryBuilder('appuser')
      .where('appuser.username = :username', { username: username })
      .getOne();

    return found;
  }
}
