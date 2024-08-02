import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  private orders = [];
  constructor(private httpService: HttpService) {}
  getOrder(id: number) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
  async createOrder(orderItems: { menuItemId: number; quantity: number }[]) {
    const menuResponse = await firstValueFrom(
      this.httpService.get('http://localhost:3001/menu'),
    );
    const menuItems = menuResponse.data;
    console.log('menuItems', menuItems);
    let total = 0;
    const orderItem2 = [];
    for (const item of orderItems) {
      const menuItem = menuItems.find((mi) => mi.id === item.menuItemId);
      orderItem2.push({ ...menuItem, quantity: item.quantity });
      if (!menuItem) {
        throw new NotFoundException(`Menu item ${item.menuItemId} not found`);
      }
      total += menuItem.price * item.quantity;
    }
    const order = { id: this.orders.length + 1, items: orderItem2, total };
    this.orders.push(order);
    return order;
  }
}
