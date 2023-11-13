import {
  Controller,
  Get,
  Post,
  Request,
  Res,
  Render,
  UseGuards,
  UseFilters,
  Response
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
