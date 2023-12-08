import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: 60 * 72 },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
