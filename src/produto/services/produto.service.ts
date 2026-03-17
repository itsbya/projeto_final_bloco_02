import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from "typeorm";


@Injectable()
export class ProdutoService{
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
    ){}

    // PROCURAR TODOS
    async findAll(): Promise<Produto[]>{
        
        return this.produtoRepository.find({
          relations:{
                categoria:true
            } 
        })
    }


    // PROCURAR POR ID
    async findById(id: number): Promise<Produto>{
        
        const produto = await this.produtoRepository.findOne({
              where: {
                id
            }, 
            relations:{
                categoria:true
            } 
        })

        if(!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
}
       
       // PROCURAR POR DESCRIÇÃO
       async findAllByDescricao(descricao: string): Promise<Produto[]>{
    
    return this.produtoRepository.find({
      where:{
        descricao: ILike(`%${descricao}%`)
      }, 
      relations:{
                categoria:true
            } 
    })
  }


   // PROCURAR POR VALOR MAIOR QUE PREÇO
   async FindAllByMaiorPreco(preco: number): Promise<Produto[]>{
        const maior = await this.produtoRepository.find({
           where:{ 
            preco: MoreThan(preco)},
            relations:{
                categoria: true
            },
            order: {
            preco: "ASC"
        }
        })

        if(!maior.length)
         throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)     
        return maior; 
    }



     // PROCURAR POR VALOR MENOR QUE PREÇO
    async FindAllByMenorPreco(preco: number): Promise<Produto[]>{
        const menor = await this.produtoRepository.find({
            
            where: {
                preco: LessThan(preco)}, 
            relations:{
                categoria: true
            },    
            order: {
            preco: "DESC"
        }
        })

        if(!menor.length)
         throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)     
        return menor; 
    }


  
 // CRIAR PRODUTO
  async create(produto: Produto): Promise<Produto>{

    return this.produtoRepository.save(produto);
  }


// ATUALIZAR PRODUTO
  async update(produto: Produto): Promise<Produto>{

    if (!produto.id || produto.id <= 0)
      throw new HttpException("O ID da produto é inválido!", HttpStatus.BAD_REQUEST);

    
    await this.findById(produto.id);
    

    return this.produtoRepository.save(produto);
  }


// DELETAR PRODUTO
  async delete(id: number): Promise<DeleteResult>{
    
    await this.findById(id);

    
    return this.produtoRepository.delete(id);
    
  }
}