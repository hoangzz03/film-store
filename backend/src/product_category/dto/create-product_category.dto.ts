import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
export class CreateProductCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
