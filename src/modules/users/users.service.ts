import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async create(data: CreateUserDto): Promise<User> {
    const password = bcrypt.hashSync(data.password, 10);

    return await this.prismaService.user.create({
      data: { ...data, password },
    });
  }

  async findFirst(id: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { id } });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    let password: string;

    if (data.password) {
      password = bcrypt.hashSync(data.password, 10);
    }

    return await this.prismaService.user.update({
      where: { id },
      data: { ...data, password },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }
}
