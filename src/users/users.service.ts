import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (exists) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(Number(process.env.JWT_SALT_ROUNDS));

    const hash = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hash,
      },
    });

    return { ...user, password: undefined };
  }

  async authenticate({ email, password }: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        password: true,
        email: true,
        id: true,
        role: true,
      },
    });

    if (!user) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new HttpException('Bad Request', HttpStatus.FORBIDDEN);
    }

    return { email: user.email, id: user.id, role: user.role };
  }

  async findOne(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
