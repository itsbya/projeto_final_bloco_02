import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";


@Injectable()
export class CategoriaService{
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
    ){}


    //PROCURAR TODOS
    async findAll(): Promise<Categoria[]>{
       
        return this.categoriaRepository.find()
    }


    //PROCURAR POR ID
    async findById(id: number): Promise<Categoria>{
        
        const categoria = await this.categoriaRepository.findOne({
              where: {
                id
            }, 
        
        } )

        if(!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return categoria;
}


    //PROCURAR POR DESCRIÇÃO
    async findAllByDescricao(descricao: string): Promise<Categoria[]>{
    
    return this.categoriaRepository.find({
      where:{
        descricao: ILike(`%${descricao}%`)
      }, 
    })
  }


  //CRIAR CATEGORIA
  async create(categoria: Categoria): Promise<Categoria>{
   
    return this.categoriaRepository.save(categoria);
  }


  //ATUALIZAR CATEGORIA
  async update(categoria: Categoria): Promise<Categoria>{

    if (!categoria.id || categoria.id <= 0)
      throw new HttpException("O ID da categoria é inválido!", HttpStatus.BAD_REQUEST);

    await this.findById(categoria.id);

 
    return this.categoriaRepository.save(categoria);
  }


  //DELETAR CATEGORIA
  async delete(id: number): Promise<DeleteResult>{
    
    await this.findById(id);

    
    return this.categoriaRepository.delete(id);
    
  }
}
