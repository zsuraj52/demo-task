import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CalcInputExpression {
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Arithmetic Expression',
    default: '1+1+1',
  })
  expression: string;
}

export class CalcOutputExpression {
  @IsString()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Expression Result',
    default: '3',
  })
  expression: number;
}

export class JSONOutputDTO {
  @IsNumber()
  @ApiProperty({ type: Number })
  userId: number;

  @IsString()
  @ApiProperty({ type: Number })
  id: number;

  @IsString()
  @ApiProperty({ type: String })
  title: string;

  @IsString()
  @ApiProperty({ type: String })
  body: string;
}
