/* eslint-disable prettier/prettier */
import { ArrayMinSize, 
  IsNotEmpty, 
  MaxLength, 
  Min, 
  IsUrl,
  ValidateNested, 
  IsArray, 
  IsNumber, 
  IsUUID} from 'class-validator';
import { Type } from "class-transformer";


export class CaracteristicaProdutoDTO {
    @IsNotEmpty( {message: 'O nome não pode ser vazio'} )
    nome: string;

    @IsNotEmpty( {message: 'A descrição não pode ser vazia'} )
    descricao: string;
}

export class ImagemProdutoDTO {
    @IsUrl()
    url: string;

    @IsNotEmpty( {message: 'A descrição não pode ser vazia)'} )
    descricao: string;
}

export class CriaProdutoDTO {
    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    idUsuario: string;

    @IsNotEmpty( {message: 'O nome não pode ser vazio'} )
    nome: string;

    @IsNumber( { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false } )
    @Min(1, { message: 'Informe o valor do produto' })
    valor: number;

    @IsNumber()
    @Min(0, { message: 'A quantidade não pode ser vazia' })
    quantidade: number;

    @IsNotEmpty( {message: 'A descrição não pode ser vazia'} )
    @MaxLength(1000, {
        message: 'Descrição não pode ter mais que 1000 caracteres',
      })
    descricao: string;
    
    
    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3)
    @Type(() => CaracteristicaProdutoDTO)
    caracteristicas: CaracteristicaProdutoDTO[];
    
    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImagemProdutoDTO)
    imagens: ImagemProdutoDTO[];
    
    @IsNotEmpty( {message: 'A categoria não pode ser vazia'} )
    categoria: string;
}
