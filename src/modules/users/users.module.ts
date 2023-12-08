import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../database/database.service';
import { UserExistsMiddleware } from './middlewares/user-exists.middleware';
import { UserNotFoundMiddleware } from './middlewares/user-not-found.middleware';
import { UserPermissionsMiddleware } from './middlewares/user-permissions.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserExistsMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST })
      .apply(UserPermissionsMiddleware, UserNotFoundMiddleware)
      .forRoutes('users/:id');
  }
}
