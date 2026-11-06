import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class DiscoverySearchDto {
  @ApiProperty({ example: "restaurantes" })
  @IsString()
  category!: string;

  @ApiProperty({ example: "Alta Gracia, Córdoba" })
  @IsString()
  region!: string;

  @ApiPropertyOptional({ minimum: 1, maximum: 10, default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  limit?: number;
}
