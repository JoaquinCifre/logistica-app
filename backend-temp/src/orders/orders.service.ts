import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './order.entity';
const DEPOT = {
  name: 'Deposito CLS',
  latitude: -34.651,
  longitude: -58.436,
};
const priorityValue = (
  priority: string,
) => {
  switch (priority) {
    case 'URGENT':
      return 3;

    case 'IMPORTANT':
      return 2;

    default:
      return 1;
  }
};
function distance(
  lat1,
  lon1,
  lat2,
  lon2,
) {
  return Math.sqrt(
    Math.pow(lat2 - lat1, 2) +
      Math.pow(lon2 - lon1, 2),
  );
}
function optimizeNearestNeighbor(
  orders: Order[],
) {
  const route: Order[] = [];

  let currentLatitude =
    DEPOT.latitude;

  let currentLongitude =
    DEPOT.longitude;

  const remaining = [...orders];

  while (
    remaining.length > 0
  ) {
    let nearestIndex = 0;

    let nearestDistance =
      Number.MAX_VALUE;

    for (
      let i = 0;
      i < remaining.length;
      i++
    ) {
      const order =
        remaining[i];

      const d = distance(
        currentLatitude,
        currentLongitude,
        order.client.latitude,
        order.client.longitude,
      );

      if (
        d < nearestDistance
      ) {
        nearestDistance = d;
        nearestIndex = i;
      }
    }

    const nextOrder =
      remaining.splice(
        nearestIndex,
        1,
      )[0];

    route.push(
      nextOrder,
    );

    currentLatitude =
      nextOrder.client.latitude;

    currentLongitude =
      nextOrder.client.longitude;
  }

  return route;
}
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  create(orderData: Partial<Order>) {
    const order =
      this.ordersRepository.create(orderData);

    return this.ordersRepository.save(order);
  }

  findAll() {
    return this.ordersRepository.find({
      relations: {
        client: true,
      },
    });
  }

  
async countByDate(
  date: string,
  shift: string,
) {
  return this.ordersRepository.count({
    where: {
      date,
      shift,
    },
  });
}

async history() {
  const orders =
    await this.ordersRepository.find();

  const grouped = {};

  orders.forEach((order) => {
    if (!grouped[order.date]) {
      grouped[order.date] = {
        delivered: 0,
        absent: 0,
        pending: 0,
      };
    }

    if (
      order.status ===
      'COMPLETED'
    ) {
      grouped[order.date]
        .delivered++;
    }

    if (
      order.status ===
      'ABSENT'
    ) {
      grouped[order.date]
        .absent++;
    }

    if (
      order.status ===
      'PENDING'
    ) {
      grouped[order.date]
        .pending++;
    }
  });

  return grouped;
}
 async optimizeRoute() {
  const orders =
    await this.ordersRepository.find({
      relations: {
        client: true,
      },
    });

  const validOrders =
    orders.filter(
      (order) =>
        order.status ===
          "PENDING" &&
        order.client
          ?.latitude !=
          null &&
        order.client
          ?.longitude !=
          null,
    );

  const urgent =
    validOrders.filter(
      (o) =>
        o.priority ===
        "URGENT",
    );

  const important =
    validOrders.filter(
      (o) =>
        o.priority ===
        "IMPORTANT",
    );

  const normal =
    validOrders.filter(
      (o) =>
        o.priority ===
        "NORMAL",
    );

  return [
    ...optimizeNearestNeighbor(
      urgent,
    ),
    ...optimizeNearestNeighbor(
      important,
    ),
    ...optimizeNearestNeighbor(
      normal,
    ),
  ];
}

async findByDate(date: string) {
  return this.ordersRepository.find({
    where: {
      date,
    },
    relations: {
      client: true,
    },
  });
}
async update(
  id: number,
  data: Partial<Order>,
) {
  await this.ordersRepository.update(
    id,
    data,
  );

  return this.ordersRepository.findOne({
    where: { id },
    relations: {
      client: true,
    },
  });
}
async remove(id: number) {

  const order =
    await this.ordersRepository.findOne({
      where: { id },
    });

  if (
    order?.status !==
    "PENDING"
  ) {
    throw new Error(
      "Solo se pueden eliminar pedidos pendientes"
    );
  }

  await this.ordersRepository.delete(id);

  return {
    success: true,
  };
}
  async updateStatus(
    id: number,
    status: string,
  ) {
    const updateData: any = {
  status,
};

if (
  status === "COMPLETED" ||
  status === "ABSENT"
) {
  updateData.completedAt =
    new Date();
}

await this.ordersRepository.update(
  id,
  updateData,
);

    

    return this.ordersRepository.findOne({
      where: { id },
      relations: {
        client: true,
      },
    });
  }

  async optimizeRouteByDate(
  date: string,
  shift: string,
) {
  const orders =
    await this.ordersRepository.find({
      where: {
        date,
        shift,
        status: 'PENDING',
      },
      relations: {
        client: true,
      },
    });

    

orders.sort(
  (a, b) =>
    priorityValue(
      b.priority
    ) -
    priorityValue(
      a.priority
    )
);
  const validOrders = orders;

  const route: Order[] = [];

let currentLatitude =
  DEPOT.latitude;

let currentLongitude =
  DEPOT.longitude;

const remaining =
  [...validOrders];

while (
  remaining.length > 0
) {
  let nearestIndex = 0;

  let nearestDistance =
    Number.MAX_VALUE;

  for (
    let i = 0;
    i < remaining.length;
    i++
  ) {
    const order =
      remaining[i];

    const distance =
      Math.sqrt(
        Math.pow(
          order.client
            .latitude -
            currentLatitude,
          2,
        ) +
          Math.pow(
            order.client
              .longitude -
              currentLongitude,
            2,
          ),
      );

    if (
      distance <
      nearestDistance
    ) {
      nearestDistance =
        distance;

      nearestIndex = i;
    }
  }

  const nextOrder =
    remaining.splice(
      nearestIndex,
      1,
    )[0];

  route.push(
    nextOrder,
  );

  currentLatitude =
    nextOrder.client
      .latitude;

  currentLongitude =
    nextOrder.client
      .longitude;
}

let totalDistance = 0;

let previousLat =
  DEPOT.latitude;

let previousLng =
  DEPOT.longitude;

route.forEach((order) => {
  totalDistance += distance(
    previousLat,
    previousLng,
    order.client.latitude,
    order.client.longitude,
  );

  previousLat =
    order.client.latitude;

  previousLng =
    order.client.longitude;
});

totalDistance += distance(
  previousLat,
  previousLng,
  DEPOT.latitude,
  DEPOT.longitude,
);

return {
  route,
  totalDistance,
};

 

  

  
}

async weeklyStats() {
  const orders =
    await this.ordersRepository.find();

  return {
    delivered:
      orders.filter(
        (o) =>
          o.status ===
          'COMPLETED',
      ).length,

    absent:
      orders.filter(
        (o) =>
          o.status ===
          'ABSENT',
      ).length,

    pending:
      orders.filter(
        (o) =>
          o.status ===
          'PENDING',
      ).length,
  };
}
  async getDashboard() {
  const orders = await this.ordersRepository.find();

  return {
    total: orders.length,

    pending: orders.filter(
      (o) => o.status === 'PENDING',
    ).length,

    completed: orders.filter(
      (o) => o.status === 'COMPLETED',
    ).length,

    absent: orders.filter(
      (o) => o.status === 'ABSENT',
    ).length,

    morning: orders.filter(
      (o) => o.shift === 'MORNING',
    ).length,

    afternoon: orders.filter(
      (o) => o.shift === 'AFTERNOON',
    ).length,
  };
}
}