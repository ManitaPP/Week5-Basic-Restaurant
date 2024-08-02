import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MenuService {
  private menu = [
    { id: 1, name: 'Pizza', price: 10.99 },
    { id: 2, name: 'Burger', price: 8.99 },
    { id: 3, name: 'Salad', price: 7.99 },
  ];
  getMenuItem(id: number) {
    const item = this.menu.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException('Menu item not found');
    }
    return item;
  }
  getMenu() {
    return this.menu;
  }
}
