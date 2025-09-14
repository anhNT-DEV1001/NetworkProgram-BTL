import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { envVariable } from './config';
import { HealthController } from './modules/health/health.controller';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [envVariable]
    }),
    DatabaseModule,
    UserModule
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule { }
