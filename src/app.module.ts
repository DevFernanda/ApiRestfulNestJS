import { ProdutosModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsuarioModule, ProdutosModule],
})
export class AppModule {}
