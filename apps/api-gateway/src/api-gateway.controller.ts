import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  @Post('order')
  async createOrder(
    @Body() orderItems: { menuItemId: number; quantity: number }[],
  ) {
    const response = await firstValueFrom(
      this.httpService.post('http://localhost:3002/order', orderItems),
    );
    return response.data;
  }
  @Get('order/:id')
  async getOrder(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3002/order/${id}`),
    );
    return response.data;
  }
}
