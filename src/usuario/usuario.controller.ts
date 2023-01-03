/* eslint-disable prettier/prettier */
import { AtualizaUsuarioDTO } from './dto/AtuallizaUsuario.dto';

import { ListaUsuarioDTO } from './dto/listaUsuario.dto';

import { UsuarioEntity } from './usuario.entity';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioRepository } from './usuario.repository';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Controller('/usuarios')
export class UsuarioController {

  constructor(private usuarioRepository: UsuarioRepository) {}
  
    @Post()
  async criaUsuario(@Body() dadosdoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosdoUsuario.email;
    usuarioEntity.senha = dadosdoUsuario.senha;
    usuarioEntity.nome = dadosdoUsuario.nome;
    usuarioEntity.id = uuid(); 
    
    this.usuarioRepository.salvar(usuarioEntity);
    return { 
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome), 
      message: 'Usuário criado com sucesso.' }
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      usuario => new ListaUsuarioDTO(
        usuario.id,
        usuario.nome
      )
    );
        return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);

    return {
      usuario: usuarioAtualizado,
      message: 'Usuário atualizado com sucesso.'
    }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioRepository.remove(id);

    return {
      usuario: usuarioRemovido,
      message: 'Usuário removido com sucesso.'
    }
  }
}
