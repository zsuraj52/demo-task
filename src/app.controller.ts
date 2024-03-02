import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CalcInputExpression,
  CalcOutputExpression,
  JSONOutputDTO,
} from './dto/app.dto';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description:
      'This API Endpoint Is Used To Get Fake JSON Data With Response Time',
  })
  @ApiResponse({
    status: 200,
    description: 'JSON Data Returned Successfully',
    type: JSONOutputDTO,
  })
  @Get()
  async testApi(): Promise<any> {
    return this.appService.fetchData();
  }

  @ApiOperation({
    description:
      'This API Endpoint Is Used To Return Arithmetic Expression Response Of Provided String',
  })
  @ApiResponse({
    status: 201,
    description: 'Expression Result',
    type: CalcOutputExpression,
  })
  @Post('/calc')
  async getCalcResult(@Body() data: CalcInputExpression) {
    return await this.appService.getCalcResultService(data.expression);
  }
}
