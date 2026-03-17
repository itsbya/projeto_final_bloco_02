import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { differenceInYears, isValid, parseISO } from 'date-fns';


@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt,
  ) {}


  private validarIdade(dataNascimento: Date | string, idadeMinima = 18): void {
    const data =
      typeof dataNascimento === 'string'
        ? parseISO(dataNascimento)
        : dataNascimento;

    if (!isValid(data)) {
      throw new HttpException(
        'Data de nascimento inválida!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const idade = differenceInYears(new Date(), data);

    if (idade < idadeMinima) {
      throw new HttpException(
        `Você precisa ter pelo menos ${idadeMinima} anos para se cadastrar!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: {
        usuario: usuario,
      },
    });
  }



  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }


  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });

    if (!usuario)
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

    return usuario;
  }



  async create(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario)
      throw new HttpException('O Usuario já existe!', HttpStatus.BAD_REQUEST);

    this.validarIdade(usuario.dataNascimento); 

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    return await this.usuarioRepository.save(usuario);
  }



  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);

    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario && buscaUsuario.id !== usuario.id)
      throw new HttpException(
        'Usuário (e-mail) já Cadastrado!',
        HttpStatus.BAD_REQUEST,
      );

    this.validarIdade(usuario.dataNascimento); 

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    return await this.usuarioRepository.save(usuario);
  }
}