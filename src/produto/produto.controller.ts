/* eslint-disable prettier/prettier */
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';

import { ProdutoEntity } from './produto.entity';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoRepository } from '../produto/produto.repository';
import { randomUUID } from 'crypto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  @Post()
    async criaNovo(@Body() dadosProduto: CriaProdutoDTO){
    const produto = new ProdutoEntity();
    produto.nome = dadosProduto.nome;
    produto.valor = dadosProduto.valor;
    produto.quantidade = dadosProduto.quantidade;
    produto.descricao = dadosProduto.descricao;
    produto.caracteristicas = dadosProduto.caracteristicas;
    produto.imagens = dadosProduto.imagens;
    produto.categoria = dadosProduto.categoria;
    produto.id = randomUUID();
    produto.idUsuario = dadosProduto.idUsuario;


    const produtoCadastrado = this.produtoRepository.salvar(produto); 
    return produtoCadastrado;
  }

  @Get()
  async listProdutos() {
    return this.produtoRepository.listar();  
  }

  @Put('/:id')
  async atualizaProduto(@Param('id') id:string, @Body() novosDados: AtualizaProdutoDTO) {
    const produtoAtualizado = await this.produtoRepository.atualizaProduto(id, novosDados,);

    return {
      produto: produtoAtualizado,
      message: 'Produto atualizado com sucesso.'
    }
  }

  @Delete('/:id')
  async removeProduto(@Param('id') id: string) {
    const produtoRemovido = await this.produtoRepository.remove(id);

    return {
      usuario: produtoRemovido,
      message: 'Produto removido com sucesso.'
    }
  }
  
}