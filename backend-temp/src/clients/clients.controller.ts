import { Controller, Get, Post, Body, Param, Patch, Delete} from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() body: any) {
    return this.clientsService.create(body);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }
  @Get(':id')
findOne(
  @Param('id') id: string,
) {
  return this.clientsService.findOne(
    Number(id),
  );
}
@Patch(':id')
update(
  @Param('id') id: string,
  @Body() body: any,
) {
  return this.clientsService.update(
    Number(id),
    body,
  );
}
@Delete(':id')
remove(
  @Param('id') id: string,
) {
  return this.clientsService.remove(
    Number(id),
  );
}
@Patch(':id/deactivate')
deactivate(
  @Param('id') id: string,
) {
  return this.clientsService.deactivate(
    Number(id),
  );
}
}