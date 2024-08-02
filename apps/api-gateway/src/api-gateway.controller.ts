import { Controller, Get, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class ApiGatewayController {
  constructor(private httpService: HttpService) {}
  @Get('menu')
  async getMenu() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3001/menu'),
    );
    return response.data;
  }
  @Get('menu/:id')
  async getMenuItem(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/menu/${id}`),
    );
    return response.data;
  }
}
