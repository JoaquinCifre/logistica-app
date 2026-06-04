"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PlanningPage() {
  const [date, setDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [orders, setOrders] =
    useState<any[]>([]);

  const loadOrders = async (
    selectedDate: string
  ) => {
    const response =
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/date/${selectedDate}`
      );

    setOrders(response.data);
  };

  useEffect(() => {
    loadOrders(date);
  }, []);

  return (
    <main className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        📅 Planificación
      </h1>

      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          loadOrders(
            e.target.value
          );
        }}
        className="border p-2 rounded"
      />

      <div className="mt-8">

        <h2 className="text-xl font-bold">
          Turno Mañana
        </h2>

        {orders
          .filter(
            (o) =>
              o.shift ===
              "MORNING"
          )
          .map((o) => (
            <div
              key={o.id}
              className="border rounded p-3 mt-2"
            >
              {o.client.name}
            </div>
          ))}

      </div>

      <div className="mt-8">

        <h2 className="text-xl font-bold">
          Turno Tarde
        </h2>

        {orders
          .filter(
            (o) =>
              o.shift ===
              "AFTERNOON"
          )
          .map((o) => (
            <div
              key={o.id}
              className="border rounded p-3 mt-2"
            >
              {o.client.name}
            </div>
          ))}

      </div>

    </main>
  );
}