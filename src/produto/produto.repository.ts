/* eslint-disable prettier/prettier */


import { ProdutoEntity } from './produto.entity';

import { Injectable } from "@nestjs/common";

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  async salvar(produtos: ProdutoEntity) {
    this.produtos.push(produtos);
    return produtos;
  }

  async listar() {
    return this.produtos;
  }

  private buscaPorId(id: string) {
    const possivelProduto = this.produtos.find(
      produtoSalvo => produtoSalvo.id === id
    );
    if (!possivelProduto) {
      throw new Error('Produto não existe.');
    }
    return possivelProduto;
  }

  async atualizaProduto(id: string, dadosDeAtualizacao: Partial<ProdutoEntity>) {
    const dadosNaoAtualizaveis = ['id', 'idUsuario'];
    const produto = this.buscaPorId(id);
  
    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      produto[chave] = valor;
   
    });

    return produto;
  }

  async remove (id:string) {
    const produto = this.buscaPorId(id);

    this.produtos = this.produtos.filter(
      produtoSalvo => produtoSalvo.id !== id
    );
    return produto;
  }
}