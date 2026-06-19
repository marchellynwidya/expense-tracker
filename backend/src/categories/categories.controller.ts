import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  create(@Body('name') name: string, @Body('icon') icon?: string) {
    return this.categoriesService.create(name, icon);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('name') name: string, @Body('icon') icon?: string) {
    return this.categoriesService.update(id, name, icon);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.softDelete(id);
  }
}