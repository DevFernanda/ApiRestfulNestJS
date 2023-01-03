/* eslint-disable prettier/prettier */
import { EmailUnicoValidator } from './validacao/email-unico.validator';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioController } from './usuario.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioRepository, EmailUnicoValidator]
})
export class UsuarioModule {}
