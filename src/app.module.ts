import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LoggingMiddleWare } from './middlewares/logging.middleware';
import { UserAuthModule } from './user-auth/user-auth.module';
import { UserAuthController } from './user-auth/user-auth.controller';
import { UserAuthService } from './user-auth/user-auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get<string>('MONGODB_CONNECTION_STRING'),

        };
      },
    }),
    UserModule,
    UserAuthModule,
  ],
  controllers: [AppController, UserAuthController],
  providers: [AppService, UserAuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleWare).forRoutes('*');
  }
}
