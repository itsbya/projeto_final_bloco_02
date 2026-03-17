import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '7803luxO.',
      database: 'db_ecommerce_farmacia',
      entities: [Categoria, Produto],
      synchronize: true,
}),
CategoriaModule,
ProdutoModule

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
