import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity({name: "tb_categorias"}) 
export class Categoria{
    
    @PrimaryGeneratedColumn() 
    id: number;


   //REGISTRO DO NOME
   @Transform(({value} : TransformFnParams) => value?.trim()) 
   @IsNotEmpty() 
   @Column({length: 100, nullable: false})
    nome: string;
   

   //REGISTRO DA DESCRIÇÃO
   @IsNotEmpty() 
   @Column({length: 255, nullable: false})
   descricao: string;

   

}