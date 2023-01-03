/* eslint-disable prettier/prettier */
import { ProdutoRepository } from './produto.repository';
import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoRepository]
})
export class ProdutosModule {}
