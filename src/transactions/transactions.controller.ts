import {
  Controller,
  Get,
 Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { TransactionType } from './transactions.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
findAll(
  @Query('month') month?: number,
  @Query('year') year?: number,
) {
  return this.transactionsService.findAll(month, year);
}

  @Post()
  create(@Body() body: { amount: number; note?: string; date: string; type: TransactionType; categoryId: string }) {
    return this.transactionsService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<{ amount: number; note: string; date: string; type: TransactionType; categoryId: string }>) {
    return this.transactionsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.softDelete(id);
  }
}