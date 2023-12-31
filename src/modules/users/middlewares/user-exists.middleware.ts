import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/modules/database/database.service';

@Injectable()
export class UserExistsMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const user = await this.prismaService.user.findUnique({
      where: { email: req.body.email ?? '' },
    });

    if (user) {
      throw new ConflictException('Email already exists');
    }

    next();
  }
}
