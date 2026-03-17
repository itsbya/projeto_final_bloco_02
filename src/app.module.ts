import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '7803luxO.',
      database: 'db_ecommerce_farmacia',
      entities: [],
      synchronize: true,
})

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
