/* eslint-disable prettier/prettier */
import { IsEmail, MinLength } from "class-validator";
import { IsNotEmpty } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
/* eslint-disable prettier/prettier */
export class CriaUsuarioDTO {
    // @IsString()
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    @EmailUnico({message:'Já existe um usuário com este e-mail'})
    email: string;

    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
    senha: string;
}
