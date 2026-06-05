import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

import { Client } from './client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async create(clientData: Partial<Client>) {
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            q: `${clientData.address}, Buenos Aires, Argentina`,
            format: 'json',
            limit: 1,
          },
          headers: {
            'User-Agent': 'logistica-app',
          },
        },
      );

      if (response.data.length > 0) {
        clientData.latitude = parseFloat(
          response.data[0].lat,
        );

        clientData.longitude = parseFloat(
          response.data[0].lon,
        );
      }
    } catch (error) {
      console.error(
        'Error geocoding address',
        error,
      );
    }

    const client =
      this.clientsRepository.create(clientData);

    return this.clientsRepository.save(client);
  }

  findAll() {
  return this.clientsRepository.find({
    where: {
      active: true,
    },
  });
}
  findOne(id: number) {
  return this.clientsRepository.findOne({
    where: { id },
  });
}
async update(
  id: number,
  clientData: Partial<Client>,
) {

  const client =
    await this.findOne(id);

  if (
    clientData.address &&
    clientData.address !==
      client.address
  ) {

    try {

      const response =
        await axios.get(
          'https://nominatim.openstreetmap.org/search',
          {
            params: {
              q: `${clientData.address}, Buenos Aires, Argentina`,
              format: 'json',
              limit: 1,
            },
            headers: {
              'User-Agent':
                'logistica-app',
            },
          },
        );

      if (
        response.data.length > 0
      ) {

        clientData.latitude =
          parseFloat(
            response.data[0].lat
          );

        clientData.longitude =
          parseFloat(
            response.data[0].lon
          );
      }

    } catch (error) {

      console.error(
        'Error geocoding address',
        error,
      );
    }
  }

  await this.clientsRepository.update(
    id,
    clientData,
  );

  return this.findOne(id);
}

async remove(id: number) {
  await this.clientsRepository.delete(id);

  return {
    success: true,
  };
}
async deactivate(id: number) {
  await this.clientsRepository.update(
    id,
    {
      active: false,
    },
  );

  return {
    success: true,
  };
}
}