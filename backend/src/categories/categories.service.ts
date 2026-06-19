import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  findAll() {
  return this.categoryRepository.find({ withDeleted: false });
}

  create(name: string, icon?: string) {
    const category = this.categoryRepository.create({ name, icon });
    return this.categoryRepository.save(category);
  }

  update(id: string, name: string, icon?: string) {
    return this.categoryRepository.update(id, { name, icon });
  }

  softDelete(id: string) {
    return this.categoryRepository.softDelete(id);
  }
}