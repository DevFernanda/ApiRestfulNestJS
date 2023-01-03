/* eslint-disable prettier/prettier */
import { ArrayMinSize, 
  IsNotEmpty, 
  MaxLength, 
  Min, 
  IsUrl,
  ValidateNested, 
  IsArray, 
  IsNumber,
  IsOptional, 
  IsUUID} from 'class-validator';
import { Type } from "class-transformer";
import { CaracteristicaProdutoDTO, ImagemProdutoDTO } from './CriaProduto.dto'



export class AtualizaProdutoDTO {
    @IsUUID(undefined, {message: 'Id do produto inválido'} )
    id: string;
  
    @IsUUID(undefined, {message: 'Id do usuário inválido'} )
    idUsuario: string
  
    @IsOptional()
    @IsNotEmpty( {message: 'O nome não pode ser vazio'} )
    nome: string;

    @IsOptional()
    @IsNumber( { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false } )
    @Min(1, { message: 'Informe o valor do produto' })
    valor: number;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'A quantidade não pode ser vazia' })
    quantidade: number;

    @IsOptional()
    @IsNotEmpty( {message: 'A descrição não pode ser vazia'} )
    @MaxLength(1000, {
        message: 'Descrição não pode ter mais que 1000 caracteres',
      })
    descricao: string;
    
    
    @IsOptional()
    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3)
    @Type(() => CaracteristicaProdutoDTO)
    caracteristicas: CaracteristicaProdutoDTO[];
    
    @IsOptional()
    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImagemProdutoDTO)
    imagens: ImagemProdutoDTO[];
    
    @IsOptional()
    @IsNotEmpty( {message: 'A categoria não pode ser vazia'} )
    categoria: string;
}
