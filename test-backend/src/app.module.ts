import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { CitiesModule } from '@cities/cities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: false,
        autoLoadEntities: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        options: {
          charset: 'utf8mb4',
        },
      }),
    }),
    CitiesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
