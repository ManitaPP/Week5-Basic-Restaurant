import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenu() {
    return this.menuService.getMenu();
  }

  @Get(':id')
  getMenuItem(@Param('id') id: string) {
    return this.menuService.getMenuItem(+id);
  }
}
