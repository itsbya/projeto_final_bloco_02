import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';


@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  //REGISTRO DO NOME
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;



  //REGISTRO DA DESCRIÇÃO
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  descricao: string;



  //REGISTRO DO PREÇO
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  preco: number;


  //REGISTRO DO FOTO
  @Column()
  foto: string;
  

  //Relacionamento com Categoria
  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;
}
