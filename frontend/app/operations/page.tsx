"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import {
  Truck,
  Package,
  Users,
} from "lucide-react";
const MapView = dynamic(
  () => import("../components/OperationsMap"),
  {
    ssr: false,
  }
);

export default function OperationsPage() {
  const [route, setRoute] =
    useState<any[]>([]);

    

  const loadRoute = async () => {
    const response =
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/optimize`
      );

    setRoute(response.data);
  };

  useEffect(() => {
    loadRoute();
  }, []);

  if (!route.length) {
    return (
      <main className="p-8">
        <h1
  className="
  text-4xl
  font-bold
  tracking-tight
  mb-8
  "
>
  Recorrido de hoy
</h1>

        <div className="
bg-white
rounded-2xl
shadow-sm
border
border-slate-200
p-8
">

  <div
  className="
  flex
  items-center
    justify-center
  gap-4
  mb-4
  "
>

  <div className="text-3xl">
    ✅
  </div>

  <div
    className="
    text-4xl
    font-bold
    tracking-tight
    "
  >
    Recorrido finalizado
  </div>

</div>

  <div className="mt-2 text-2xl flex justify-center">
    No quedan entregas pendientes.
  </div>

</div>
      </main>
    );
  }

  const order = route[0];

 const updateStatus = async (
  status: string
) => {
  try {
    console.log(
      "Actualizando:",
      order.id,
      status
    );

    const response =
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${order.id}/status`,
        {
          status,
        }
      );

    console.log(
      "Respuesta:",
      response.data
    );

    await loadRoute();
    alert("Estado actualizado");

  } catch (error) {
    console.error(error);
    alert("ERROR");
  }
};

  return (
    <main className="p-6">



      <h1 className="text-3xl font-bold flex items-center gap-3">
  <Truck size={28} />
  <span>Operaciones</span>
</h1>

      <div
  className="mt-6">
  <MapView order={order} />
</div>

      <div
  className="
  bg-white
  rounded-2xl
  border
  border-slate-200
  shadow-sm
  p-8
  mt-6
  "
>

        <div
  className="
  inline-flex
  items-center
  bg-blue-50
  text-blue-700
  px-4
  py-2
  rounded-full
  text-sm
  font-semibold
  mb-4
  "
>
  Entrega 1 de {route.length}
</div>

<div
  className="
  text-sm
  text-slate-500
  mb-6
  "
>
  Restan {route.length - 1} entregas
</div>

        <div className="text-sm text-gray-500">
          Próxima parada
        </div>

        <h2 className="text-2xl font-bold mt-2">
          {order.client.name}
        </h2>
<div className="mt-2">

  {order.priority === "URGENT" ? (
  <span
    className="
    bg-red-100
    text-red-700
    px-3
    py-1
    rounded-full
    text-sm
    font-semibold
    "
  >
    Urgente
  </span>
) : order.priority === "IMPORTANT" ? (
  <span
    className="
    bg-yellow-100
    text-yellow-700
    px-3
    py-1
    rounded-full
    text-sm
    font-semibold
    "
  >
    Importante
  </span>
) : (
  <span
    className="
    bg-slate-100
    text-slate-700
    px-3
    py-1
    rounded-full
    text-sm
    font-semibold
    "
  >
    Normal
  </span>
)}

</div>
        <div className="mt-3">
          📍 {order.client.address}
        </div>

        <div className="mt-2">
          📞 {order.client.phone}
        </div>
        {order.client.contactName && (
  <div className="mt-2">
    👤 {order.client.contactName}
  </div>
)}

{order.client.schedule && (
  <div className="mt-2">
    🕐 {order.client.schedule}
  </div>
)}

{order.client.deliveryInstructions && (
  <div className="mt-2 border rounded p-3">
    📦 {order.client.deliveryInstructions}
  </div>
)}

{order.client.notes && (
  <div className="mt-2 border rounded p-3">
    📝 {order.client.notes}
  </div>
)}

        <div className="
flex
flex-col
md:flex-row
gap-3
mt-6
">

          <a
            href={`https://wa.me/${order.client.phone}`}
            target="_blank"
            className="
bg-white
border
border-slate-300
rounded-xl
px-4
py-3
font-medium
hover:bg-slate-50
transition-all
"
          >
            WhatsApp
          </a>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
              order.client.address
            )}`}
            target="_blank"
            className="
bg-white
border
border-slate-300
rounded-xl
px-4
py-3
font-medium
hover:bg-slate-50
transition-all
"
          >
            Navegar
          </a>

        </div>

        <div className="
flex
flex-col
md:flex-row
gap-3
mt-6
">

          <button
  onClick={() => {

    const confirmed =
      confirm(
        "¿Marcar como entregado?"
      );

    if (!confirmed) {
      return;
    }

    updateStatus(
      "COMPLETED"
    );

  }}
  className="
flex-1
bg-blue-600
hover:bg-blue-700
text-white
rounded-xl
p-4
font-semibold
"
>
  ENTREGADO
</button>

<button
  onClick={() => {

    const confirmed =
      confirm(
        "¿Marcar como ausente?"
      );

    if (!confirmed) {
      return;
    }

    updateStatus(
      "ABSENT"
    );

  }}
  className="
flex-1
bg-slate-700
hover:bg-slate-800
text-white
rounded-xl
p-4
font-semibold
"
>
  AUSENTE
</button>

          
</div>

  <div className="mt-8">

  <h3 className="font-bold text-lg">
    Próximas entregas
  </h3>

  {route
    .slice(1, 6)
    .map((nextOrder, index) => (

      <div
        key={nextOrder.id}
        className="
bg-slate-50
border
border-slate-200
rounded-xl
p-4
mt-2
hover:bg-white
transition-all
"
      >

        <div className="font-bold">
          {index + 2}.
          {" "}
          {nextOrder.client.name}
        </div>

        <div className="text-sm">
          📍 {nextOrder.client.address}
        </div>

      </div>

    ))}

</div>
        </div>

      

    </main>
  );
}