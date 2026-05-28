import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  create(clientData: Partial<Client>) {
    const client = this.clientsRepository.create(clientData);
    return this.clientsRepository.save(client);
  }

  findAll() {
    return this.clientsRepository.find();
  }
}