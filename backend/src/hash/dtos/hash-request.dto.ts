import {IsArray, IsEnum, ArrayMinSize, IsUUID} from 'class-validator'
import { HashEnum, HashType } from 'src/types';

export class HashRequestDto{
    @IsUUID('4')
    fileId: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsEnum(HashEnum,{each: true})
    hashTypes: HashType[]
}

export class HashGetRequestDto{
    @IsUUID('4')
    fileId: string;
}
