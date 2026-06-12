"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";

export default function OrderPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } = use(params);

  const [order, setOrder] =
    useState<any>(null);

  const [clients, setClients] =
    useState<any[]>([]);

  useEffect(() => {
    loadOrder();
    loadClients();
  }, []);

  const loadOrder =
    async () => {

      const response =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );

      const found =
        response.data.find(
          (o: any) =>
            o.id === Number(id)
        );

      setOrder(found);
    };

  const loadClients =
    async () => {

      const response =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/clients`
        );

      setClients(response.data);
    };

  const saveOrder =
    async () => {

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        {
          date: order.date,
          shift: order.shift,
          notes: order.notes,
          priority:
            order.priority,
            
          client: {
            id:
              order.client.id,
          },
          operations: order.operations,
requiresDepot:
  order.requiresDepot,
        }
      );

      window.location.href =
        "/orders";
    };

  const deleteOrder =
    async () => {

      const confirmed =
        confirm(
          "¿Eliminar pedido?"
        );

      if (!confirmed) {
        return;
      }

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`
      );

      window.location.href =
        "/orders";
    };

  if (!order) {
    return (
      <div>Cargando...</div>
    );
  }

  return (
    <main
      className="
      max-w-5xl
      mx-auto
      p-6
      "
    >

      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        Editar Pedido
      </h1>

      <button
        onClick={() =>
          window.location.href =
            "/orders"
        }
        className="
       mb-6
px-4
py-3
border
border-slate-200
rounded-xl
bg-white
hover:bg-brand-50
text-slate-700
font-semibold
transition-all
duration-200
shadow-sm
hover:shadow-md
        "
      >
        ← Volver
      </button>

      <div
        className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        p-8
        "
      >

        <label
          className="
          block
          mb-2
          font-semibold
          "
        >
          Cliente
        </label>

        <select
          value={
            order.client.id
          }
          onChange={(e) =>
            setOrder({
              ...order,
              client: {
                id: Number(
                  e.target.value
                ),
              },
            })
          }
          className="
          w-full
          border
          rounded-xl
          p-3
          mb-4
          "
        >
          {clients.map(
            (client) => (
              <option
                key={client.id}
                value={
                  client.id
                }
              >
                {client.name}
{" - "}
{client.address}
              </option>
            )
          )}
        </select>
<label
  className="
  block
  mb-3
  font-semibold
  "
>
  Operaciones
</label>

<div
  className="
  grid
  grid-cols-1
  md:grid-cols-3
  gap-3
  mb-6
  "
>

<button
  type="button"
  onClick={() => {

    const exists =
      order.operations?.includes(
        "DELIVERY"
      );

    setOrder({
      ...order,
      operations: exists
        ? order.operations.filter(
            (op:string) =>
              op !==
              "DELIVERY"
          )
        : [
            ...(order.operations ||
              []),
            "DELIVERY",
          ],
    });

  }}
  className={`
    rounded-xl
    p-3
    border
    font-semibold
    transition-all

    ${
      order.operations?.includes(
        "DELIVERY"
      )
        ? `
          bg-brand-100
          border-brand-300
          text-brand-700
        `
        : `
          bg-white
          border-slate-200
          text-slate-700
        `
    }
  `}
>
  Entrega
</button>

<button
  type="button"
  onClick={() => {

    const exists =
      order.operations?.includes(
        "PICKUP"
      );

    setOrder({
      ...order,
      operations: exists
        ? order.operations.filter(
            (op:string) =>
              op !==
              "PICKUP"
          )
        : [
            ...(order.operations ||
              []),
            "PICKUP",
          ],
    });

  }}
  className={`
    rounded-xl
    p-3
    border
    font-semibold
    transition-all

    ${
      order.operations?.includes(
        "PICKUP"
      )
        ? `
          bg-brand-100
          border-brand-300
          text-brand-700
        `
        : `
          bg-white
          border-slate-200
          text-slate-700
        `
    }
  `}
>
  Retira
</button>

<button
  type="button"
  onClick={() => {

    const exists =
      order.operations?.includes(
        "COLLECTION"
      );

    setOrder({
      ...order,
      operations: exists
        ? order.operations.filter(
            (op:string) =>
              op !==
              "COLLECTION"
          )
        : [
            ...(order.operations ||
              []),
            "COLLECTION",
          ],
    });

  }}
  className={`
    rounded-xl
    p-3
    border
    font-semibold
    transition-all

    ${
      order.operations?.includes(
        "COLLECTION"
      )
        ? `
          bg-brand-100
          border-brand-300
          text-brand-700
        `
        : `
          bg-white
          border-slate-200
          text-slate-700
        `
    }
  `}
>
  Cobra
</button>

</div>

<div
  className="
  flex
  items-center
  gap-3
  mb-6
  "
>

  <input
    type="checkbox"
    checked={
      order.requiresDepot
    }
    onChange={(e) =>
      setOrder({
        ...order,
        requiresDepot:
          e.target.checked,
      })
    }
  />

  <span>
    Requiere pasar por depósito antes de esta visita
  </span>

</div>
        <label className="block mb-2 font-semibold">
          Fecha
        </label>

        <input
          type="date"
          value={order.date}
          onChange={(e) =>
            setOrder({
              ...order,
              date:
                e.target.value,
            })
          }
          className="
          w-full
          border
          rounded-xl
          p-3
          mb-4
          "
        />

        <label className="block mb-2 font-semibold">
          Turno
        </label>

        <select
          value={order.shift}
          onChange={(e) =>
            setOrder({
              ...order,
              shift:
                e.target.value,
            })
          }
          className="
          w-full
          border
          rounded-xl
          p-3
          mb-4
          "
        >
          <option value="MORNING">
            Mañana
          </option>

          <option value="AFTERNOON">
            Tarde
          </option>
        </select>

        <label className="block mb-2 font-semibold">
          Prioridad
        </label>

        <select
          value={
            order.priority
          }
          onChange={(e) =>
            setOrder({
              ...order,
              priority:
                e.target.value,
            })
          }
          className="
          w-full
          border
          rounded-xl
          p-3
          mb-4
          "
        >
          <option value="NORMAL">
            Normal
          </option>

          <option value="IMPORTANT">
            Importante
          </option>

          <option value="URGENT">
            Urgente
          </option>
        </select>

        <label className="block mb-2 font-semibold">
          Observaciones
        </label>

        <textarea
          value={
            order.notes || ""
          }
          onChange={(e) =>
            setOrder({
              ...order,
              notes:
                e.target.value,
            })
          }
          className="
          w-full
          border
          rounded-xl
          p-3
          mb-6
          "
        />

        <div
  className="
  flex
  justify-center
  gap-3
  mt-8
  "
>

          <button
            onClick={
              saveOrder
            }
            className="
            bg-brand-600
hover:bg-brand-700
text-white
px-5
py-3
rounded-xl
font-semibold
shadow-sm
hover:shadow-md
hover:-translate-y-0.5
transition-all
duration-200
            "
          >
            Guardar
          </button>

          {order.status ===
            "PENDING" && (
            <button
              onClick={
                deleteOrder
              }
              className="
             bg-rose-600
hover:bg-rose-700
text-white
px-5
py-3
rounded-xl
font-semibold
shadow-sm
hover:shadow-md
hover:-translate-y-0.5
transition-all
duration-200
              "
            >
              Eliminar
            </button>
          )}

        </div>

      </div>

    </main>
  );
}