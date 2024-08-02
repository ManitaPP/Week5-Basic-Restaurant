import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getHello(): string {
    return this.menuService.getHello();
  }
}
