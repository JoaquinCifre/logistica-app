"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, Search, Calendar, Clock3, ClipboardList, FileText } from "lucide-react";
interface Client {
  id: number;
  name: string;
}

interface Order {
  id: number;
  date: string;
  shift: string;
  status: string;
  notes: string;
  priority: string;
  client: Client;
  completedAt?: string;
}

export default function OrdersPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] =
  useState("");
const [filterDate, setFilterDate] =
  useState("");
  const [filterStatus, setFilterStatus] =
  useState("");
  const [message, setMessage] =
  useState("");

const [messageType, setMessageType] =
  useState<
    "success" | "error"
  >("success");
  const [form, setForm] = useState({
    clientId: "",
    date: "",
    shift: "MORNING",
    notes: "",
    priority: "NORMAL",
  });

  const fetchClients = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/clients`
    );

    setClients(
  [...response.data].reverse()
);
  };

  const fetchOrders = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/orders`
    );

    setOrders(
  response.data.sort(
    (a: any, b: any) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  )
);
  };

  useEffect(() => {
    fetchClients();
    fetchOrders();
  }, []);

  const createOrder = async () => {
    if (!form.clientId) {
    setMessage(
  "Seleccione un cliente"
);

setMessageType(
  "error"
);

setTimeout(() => {
  setMessage("");
}, 3000);
    return;
  }

  if (!form.date) {
    setMessage(
  "Seleccione una fecha"
);

setMessageType(
  "error"
);

setTimeout(() => {
  setMessage("");
}, 3000);
    return;
  }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          client: {
            id: Number(form.clientId),
          },
          date: form.date,
          shift: form.shift,
          notes: form.notes,
          priority: form.priority,
        }
      );

      setForm({
  clientId: "",
  date: "",
  shift: "MORNING",
  notes: "",
  priority: "NORMAL",
});

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
    setMessage(
  "Pedido creado correctamente"
);

setMessageType(
  "success"
);

setTimeout(() => {
  setMessage("");
}, 3000);
  };

  return (
    <main
  className="
  max-w-none
  mx-auto
  "
>
      <h1
  className="
  text-4xl
  font-bold
  mb-8
  max-w-[1000px]
mx-auto
  "
>
  Pedidos
  
</h1>
{message && (

  <div
    className={`
      mb-6
      p-4
      rounded-xl
      border
      ${
        messageType === "success"
          ? `
            bg-green-50
            border-green-200
            text-green-700
          `
          : `
            bg-red-50
            border-red-200
            text-red-700
          `
      }
    `}
  >
    {message}
  </div>

)}
<div
  className="
  flex
flex-col
gap-4
  "
>
      

      <div
  className="
  bg-white
  rounded-2xl
  border
  border-slate-200
  shadow-sm
  p-6
  "
>
  
       <h2
  className="
  text-2xl
  font-semibold
  
  "
>
  Nuevo Pedido
</h2>
<div className="relative mb-4 mt-10">
        <select 
          value={form.clientId}
          onChange={(e) =>
            setForm({
              ...form,
              clientId: e.target.value,
            })
          }
        className="
    w-full
max-w-[900px]
mx-auto
    lg:col-span-2
    border
    
    border-slate-300
    rounded-xl
    px-4
    py-3
    appearance-none
    bg-white
    ">
          <option value="">
            Seleccionar cliente
          </option>

          {clients.map((client) => (
            <option
              key={client.id}
              value={client.id}
            >
              {client.name}
            </option>
          ))}
        </select>
  

 <ChevronDown
  size={18}
  className="
  absolute
  right-4
  top-1/2
  -translate-y-1/2
  pointer-events-none
  text-slate-500
  "
/>

</div>
   <div className="relative mb-4">

<select 
  value={form.priority}
  onChange={(e) =>
    setForm({
      ...form,
      priority: e.target.value,
    })
  }
className="
    w-full
    border
    border-slate-300
    rounded-xl
    px-4
    py-3
    appearance-none
    bg-white
    ">
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
<ChevronDown
    size={18}
    className="
    absolute
    right-4
    top-1/2
    -translate-y-1/2
    pointer-events-none
    text-slate-500
    "
  />

</div>
<label
  className="
  block
  text-sm
  font-medium
  text-slate-700
  mb-2
  "
>
  Fecha
</label>
        <input className="
w-full
border
border-slate-300
rounded-xl
p-3
mb-4
"
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
        />

     
<div className="relative mb-4">
        <select 

          value={form.shift}
          onChange={(e) =>
            setForm({
              ...form,
              shift: e.target.value,
            })
          }
        className="
    w-full
    border
    border-slate-300
    rounded-xl
    px-4
    py-3
    appearance-none
    bg-white
    ">
          <option value="MORNING">
            Mañana
          </option>

          <option value="AFTERNOON">
            Tarde
          </option>
        </select>
<ChevronDown
    size={18}
    className="
    absolute
    right-4
    top-1/2
    -translate-y-1/2
    pointer-events-none
    text-slate-500
    "
  />

</div>
        

        <input className="
w-full
border
border-slate-300
rounded-xl
p-3
mb-4
"
          placeholder="Observaciones"
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
        />

    
        <button
  onClick={createOrder}
  className="
  w-full
  bg-blue-600
  hover:bg-blue-700
  text-white
  py-3
  rounded-xl
  font-semibold
  "
>
  Crear Pedido
</button>
        
      </div>
<div
  className="
  md:col-span-2
  bg-white
  rounded-2xl
  border
  border-slate-200
  shadow-sm
  p-6
  "
>
      <h2>Pedidos</h2>
<div className="relative mb-4">

  <input
    placeholder="Buscar por cliente..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="
    w-full

    mt-3
    mb-3
    border
    border-slate-300
    rounded-xl
    p-3
    pr-12
    "
  />

 <button
  className="
  absolute
  right-3
  top-1/2
  -translate-y-1/2
  text-slate-400
  pointer-events-none
  "
>
  <Search size={18} />
</button>

</div>
<label
  className="
  block
  text-sm
  font-medium
  text-slate-700
  mb-2
  "
>
  Fecha
</label>
<input className="
w-full
border
border-slate-300
rounded-xl
p-3
max-w-[1000px]
mx-auto
mb-4
"
  type="date"
  value={filterDate}
  onChange={(e) =>
    setFilterDate(
      e.target.value
    )
  }
  style={{
    marginBottom: "20px",
  }}
/>

{orders
  .filter(
  (order) =>
    (!filterDate ||
      order.date === filterDate) &&
    (!filterStatus ||
      order.status === filterStatus) &&
    (
      !search ||
      order.client?.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )
)

  .sort((a, b) => {

  const statusValue = (
    status: string
  ) => {

    switch (status) {

      case "PENDING":
        return 3;

      case "ABSENT":
        return 2;

      case "COMPLETED":
        return 1;

      default:
        return 0;
    }
  };

  const statusDiff =
    statusValue(b.status) -
    statusValue(a.status);

  if (statusDiff !== 0) {
    return statusDiff;
  }

  if (
  a.status === "COMPLETED" &&
  b.status === "COMPLETED"
) {
  return (
    new Date(
      b.completedAt || ""
    ).getTime() -
    new Date(
      a.completedAt || ""
    ).getTime()
  );
}

return (
  new Date(a.date).getTime() -
  new Date(b.date).getTime()
);
})
  
  .map((order) => (

        <div
          key={order.id}
          className="
bg-slate-50
hover:bg-white
border
w-full
border-slate-200
rounded-2xl
p-5
mb-4
shadow-sm
hover:shadow-md
transition-all
duration-200
"
        >
          <h3
  className="
  text-lg
  font-semibold
  text-slate-900
  mb-3
  "
>
  {order.client?.name}
</h3>

          <div className="flex items-center gap-2 mt-2">
  <Calendar size={16} />
  {new Date(order.date)
    .toLocaleDateString("es-AR")}
</div>

          <div className="flex items-center gap-2 mt-2">
  <Clock3 size={16} />
  {order.shift}
</div>

        {order.status === "COMPLETED" ? (
  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
    Entregado
  </span>
) : order.status === "ABSENT" ? (
  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
    Ausente
  </span>
) : (
  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
    Pendiente
  </span>
)}

{order.completedAt && (
  <div
    className="
    text-sm
    text-slate-500
    mt-2
    "
  >
    {new Date(
      order.completedAt
    ).toLocaleString(
      "es-AR",
      {
        timeZone:
          "America/Argentina/Buenos_Aires",
        hour12: false,
      }
    )}
  </div>
)}
  

<div className="flex items-center gap-2 mt-2">
  <ClipboardList size={16} />

  {order.priority === "URGENT"
    ? "Urgente"
    : order.priority === "IMPORTANT"
    ? "Importante"
    : "Normal"}
</div>
          <div className="flex items-center gap-2 mt-2">
  <FileText size={16} />
  {order.notes || "Sin observaciones"}
</div>
          <button
    onClick={() =>
      window.location.href =
        `/orders/${order.id}`
    }
    className="
    mt-4
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-4
    py-2
    rounded-xl
    "
  >
    Editar
  </button>

        </div>
      ))}</div></div>
    </main>
  );
}