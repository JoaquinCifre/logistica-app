import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import {
  Delete,
} from '@nestjs/common';
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}
@Delete(':id')
remove(
  @Param('id') id: string,
) {
  return this.ordersService.remove(
    Number(id),
  );
}
  @Post()
  create(@Body() body: any) {
    return this.ordersService.create(body);
  }
@Patch(':id')
update(
  @Param('id') id: string,
  @Body() body: any,
) {
  return this.ordersService.update(
    Number(id),
    body,
  );
}
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('optimize')
  optimizeRoute() {
    return this.ordersService.optimizeRoute();
  }

  @Patch(':id/status')
updateStatus(
  @Param('id') id: string,
  @Body() body: any,
) {
  return this.ordersService.updateStatus(
    Number(id),
    body.status,
  );
}
@Get('dashboard')
dashboard() {
  return this.ordersService.getDashboard();
}

@Get('date/:date')
findByDate(
  @Param('date') date: string,
) {
  return this.ordersService.findByDate(
    date,
  );
}

@Get('count/:date/:shift')
countByDate(
  @Param('date') date: string,
  @Param('shift') shift: string,
) {
  return this.ordersService.countByDate(
    date,
    shift,
  );
}
@Get('history')
history() {
  return this.ordersService.history();
}

@Get('weekly-stats')
weeklyStats() {
  return this.ordersService
    .weeklyStats();
}
@Get(
  'optimize/:date/:shift',
)
optimizeByDate(
  @Param('date') date: string,
  @Param('shift')
  shift: string,
) {
  return this.ordersService
    .optimizeRouteByDate(
      date,
      shift,
    );
}
}