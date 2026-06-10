"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import {
  Truck,
  Package,
  User,
  Clock,
  MessageCircle,
  FileText,
  MapPin,
  Phone,
  Navigation,
  Clock3,
  CheckCircle2
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

    const [selectedShift, setSelectedShift] =
  useState("MORNING");

const [selectedDate, setSelectedDate] =
  useState(
    new Date()
      .toISOString()
      .split("T")[0]
  );

  const loadRoute = async () => {
  const response =
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/optimize/${selectedDate}/${selectedShift}`
    );

  setRoute(
    response.data.route
  );
};

  useEffect(() => {
  loadRoute();
}, [
  selectedDate,
  selectedShift,
]);

 

  const order =
  route.length > 0
    ? route[0]
    : null;

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
  className="
  flex
  flex-col
  md:flex-row
  gap-3
  mt-6
  "
>

  <input
    type="date"
    value={selectedDate}
    onChange={(e) =>
      setSelectedDate(
        e.target.value
      )
    }
    className="
    border
    border-slate-200
    rounded-xl
    px-4
    py-3
    bg-white
    "
  />

  <select
    value={selectedShift}
    onChange={(e) =>
      setSelectedShift(
        e.target.value
      )
    }
    className="
    border
    border-slate-200
    rounded-xl
    px-4
    py-3
    bg-white
    "
  >
    <option value="MORNING">
      Mañana
    </option>

    <option value="AFTERNOON">
      Tarde
    </option>
  </select>

</div>
      <div
  className="mt-6">
  {order && (
  <MapView order={order} />
)}
</div>
{order ? (
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
  px-2
  py-2
  rounded-full
  text-sm
  font-semibold
  mb-4
  "
>
  Entrega 1 de {route.length}
</div>



        <div className="text-sm text-gray-500">
          Próxima parada
        </div>

        <h2 className="text-2xl font-bold mt-2">
          {order.client.name}
        </h2>
        <div>
 
</div>
<div
  className="
  mt-2
  flex
  flex-wrap
  gap-2
  items-center
  "
>

  {order?.operations?.map(
    (op: string) => {

      if (op === "DELIVERY") {
        return (
          <span
            key={op}
            className="
            bg-emerald-100
            text-emerald-700
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
            "
          >
            Entrega
          </span>
        );
      }

      if (op === "PICKUP") {
        return (
          <span
            key={op}
            className="
            bg-violet-100
            text-violet-700
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
            "
          >
            Retiro
          </span>
        );
      }

      if (op === "COLLECTION") {
        return (
          <span
            key={op}
            className="
            bg-amber-100
            text-amber-700
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
            "
          >
            Cobro
          </span>
        );
      }

      return null;
    }
  )}

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
        <div
  className="
  flex
  items-start
  gap-2
  mt-2
  border
  border-slate-200
  rounded-xl
  p-3
  bg-slate-50
  "
>
  <MapPin
    size={16}
    className="mt-1 shrink-0"
  />
  <span>{order.client.address}</span>
</div>

        <div
  className="
  flex
  items-start
  gap-2
  mt-2
  border
  border-slate-200
  rounded-xl
  p-3
  bg-slate-50
  "
>
  <Phone
    size={16}
    className="mt-1 shrink-0"
  />
  <span>{order.client.phone}</span>
</div>
        <div
  className="
  flex
  items-start
  gap-2
  mt-2
  border
  border-slate-200
  rounded-xl
  p-3
  bg-slate-50
  "
>
  <User
    size={16}
    className="mt-1 shrink-0"
  />
  <span>{order.client.contactName}</span>
</div>

<div
  className="
  flex
  items-start
  gap-2
  mt-2
  border
  border-slate-200
  rounded-xl
  p-3
  bg-slate-50
  "
>
  <Clock3
    size={16}
    className="mt-1 shrink-0"
  />
  <span>{order.client.schedule}</span>
</div>

<div className="
flex
items-start
gap-2
mt-2
border
border-slate-200
rounded-xl
p-3
bg-slate-50
">
  <Package size={16} className="mt-1 shrink-0" />
  <span>{order.client.deliveryInstructions}</span>
</div>

<div className="
flex
items-start
gap-2
mt-2
border
border-slate-200
rounded-xl
p-3
bg-slate-50
">
  <FileText size={16} className="mt-1 shrink-0" />
  <span>{order.client.notes}</span>
</div>

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
  flex
  items-center
  justify-center
  gap-2
  bg-green-600
  hover:bg-green-700
  shadow-sm
hover:shadow-md
hover:-translate-y-0.5
duration-200
  text-white
  rounded-xl
  px-4
  py-3
  font-semibold
  transition-all
  "
>
  <MessageCircle size={18} />
  WhatsApp
</a>

          <a
  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    order.client.address
  )}`}
  target="_blank"
  className="
  flex
  items-center
  justify-center
  gap-2
  bg-slate-800
  hover:bg-slate-900
  text-white
  rounded-xl
  shadow-sm
hover:shadow-md
hover:-translate-y-0.5
duration-200
  px-4
  py-3
  font-semibold
  transition-all
  "
>
  <Navigation size={18} />
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
bg-emerald-600
hover:bg-emerald-700
shadow-sm
hover:shadow-md
hover:-translate-y-0.5
transition-all
duration-200
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
bg-rose-600
hover:bg-rose-700
shadow-sm
hover:shadow-md
hover:-translate-y-0.5
transition-all
duration-200
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
         <MapPin size={16} /> {nextOrder.client.address}
        </div>

      </div>

    ))}

</div>
        </div>

) : (

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
    flex
    items-center
    justify-center
    gap-4
    mb-4
    "
  >

    <div
      className="
      w-20
      h-20
      rounded-full
      bg-green-100
      flex
      items-center
      justify-center
      "
    >
      <CheckCircle2
        size={48}
        className="text-green-600"
      />
    </div>

    <div
      className="
      text-3xl
      font-bold
      text-slate-900
      "
    >
      Recorrido finalizado
    </div>

  </div>

  <div
    className="
    text-center
    text-slate-500
    "
  >
    No quedan pedidos para este turno.
  </div>

</div>

)}

      

    </main>
  );
}