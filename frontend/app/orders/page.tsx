"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, Warehouse, Search, Calendar, Clock3, ClipboardList, FileText } from "lucide-react";
interface Client {
  id: number;
  name: string;
  type: string;
  address: string;
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
  operations: string[];
  requiresDepot: boolean;
}

export default function OrdersPage() {
  const [showClients, setShowClients] =
  useState(false);

const [clientSearch, setClientSearch] =
  useState("");
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
  shift: "",
  notes: "",
  priority: "NORMAL",
  operations: ["DELIVERY"],
  requiresDepot: false,
});

  const fetchClients = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/clients`
    );

    setClients(
  [...response.data]
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
          operations: form.operations,
          requiresDepot:
  form.requiresDepot,
        }
      );

      setForm({
  clientId: "",
  date: "",
  shift: "MORNING",
  notes: "",
  priority: "NORMAL",
  operations:["DELIVERY"],
  requiresDepot: false,
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
<div className="
  grid
  grid-cols-1
  w-full
  max-w-[900px]
  mx-auto
  gap-6
">
      

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
       <div className="relative mb-6">

  <button
    type="button"
    onClick={() =>
      setShowClients(
        !showClients
      )
    }
    className="
    w-full
    bg-white
    border
    border-slate-200
    rounded-xl
    p-4
    text-slate-500
    shadow-sm
    flex
    items-center
    justify-between
    hover:shadow-md
    transition-all
    "
  >
    <span>

      {
  form.clientId
    ? (() => {

        const client =
          clients.find(
            c =>
              c.id ===
              Number(
                form.clientId
              )
          );

        return client
          ? `${client.name} - ${client.address}`
          : "Seleccionar cliente";

      })()
    : "Seleccionar cliente"
}

    </span>

    <ChevronDown size={18} />
  </button>

  {showClients && (

    <div
      className="
      mt-2
      bg-white
      border
      border-slate-200
      rounded-2xl
      shadow-lg
      max-h-80
      overflow-auto
      "
    >

      <input
        placeholder="Buscar cliente..."
        value={clientSearch}
        onChange={(e) =>
          setClientSearch(
            e.target.value
          )
        }
        className="
        w-full
        p-3
        border-b
        border-slate-200
        outline-none
        "
      />

      {clients
        .filter(client =>
          client.name
            .toLowerCase()
            .includes(
              clientSearch.toLowerCase()
            )
        )
        .map(client => (

          <div
            key={client.id}
            onClick={() => {

              setForm({
                ...form,
                clientId:
                  String(
                    client.id
                  ),
              });

              setShowClients(
                false
              );

              setClientSearch(
                ""
              );
            }}
            className="
            p-4
            border-b
            border-slate-100
            hover:bg-brand-50
            cursor-pointer
            transition-all
            "
          >

            <div
              className="
              font-semibold
              "
            >
              {client.name} - {client.address}
            </div>

          </div>

        ))}

    </div>

  )}

</div>

</div>

<div className="mb-6">

  <div
    className="
    text-sm
    font-medium
    text-slate-500
    mb-3
    mt-4
    ml-2
    "
  >
    Operaciones
  </div>

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-3
    "
  >

    {[
      {
        value: "DELIVERY",
        label: "Entregar",
      },
      {
        value: "PICKUP",
        label: "Retirar",
      },
      {
        value: "COLLECTION",
        label: "Cobrar",
      },
    ].map((item) => (

      <button
        key={item.value}
        type="button"
        onClick={() => {

          const exists =
            form.operations.includes(
              item.value
            );

          setForm({
            ...form,
            operations:
              exists
                ? form.operations.filter(
                    o =>
                      o !== item.value
                  )
                : [
                    ...form.operations,
                    item.value,
                  ],
          });
        }}
        className={`
          border
          rounded-xl
          p-4
          text-left
          transition-all
          duration-200
          ${
            form.operations.includes(
              item.value
            )
              ? `
                bg-brand-50
                border-brand-300
                text-brand-700
              `
              : `
                bg-white
                border-slate-200
                hover:bg-brand-50
              `
          }
        `}
      >
        {item.label}
      </button>

    ))}

  </div>

</div>
   <div className="relative mb-4">
<div
    className="
    text-sm
    font-medium
    text-slate-500
    mb-3
    mt-4
    ml-2
    "
  >
   Prioridad
  </div>
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
appearance-none
bg-white
border
border-slate-200
bg-white
rounded-xl
px-4
py-3
text-slate-500
shadow-sm
transition-all
duration-200
focus:ring-2
focus:ring-brand-500
focus:border-brand-500
outline-none

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
    bottom-4
    pointer-events-none
    text-slate-500
    "
  />

</div>
<div
    className="
    text-sm
    font-medium
    text-slate-500
    mb-2
    mt-6
    ml-2
   
    "
  >
    Fecha
  </div>
  <div className="relative mb-4">
        <input className="
w-full
border
border-slate-200
bg-white
rounded-xl
text-slate-500
px-4
py-3

shadow-sm
transition-all
duration-200
focus:ring-2
focus:ring-brand-500
focus:border-brand-500
outline-none
appearance-none
"
          type="date"
          placeholder="Fecha"
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
        />
 <Calendar
    size={18}
    className="
    absolute
    right-4
    top-6
    -translate-y-1/2
    pointer-events-none
    text-slate-500
    "
  />
     </div>
<div className="relative mb-4 ">
  
        <select 

          value={form.shift}
          onChange={(e) =>
            setForm({
              ...form,
              shift: e.target.value,
            })
          }
        className="
        text-slate-500
w-full
border
border-slate-200
bg-white
rounded-xl
px-4
py-3
mt-6
mb-6
appearance-none
bg-white
text-slate-500
shadow-sm
transition-all
duration-200
focus:ring-2
focus:ring-brand-500
focus:border-brand-500
outline-none
">
  <option value="">
  Seleccionar turno
</option>
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
        
<div
  className="
  mt-4
  flex
  items-center
  gap-3
  "
>

  </div>
        <input className="
w-full
border
border-slate-200
bg-white
rounded-xl
text-slate-500
px-4
py-3
mb-6
shadow-sm
transition-all
duration-200
focus:ring-2
focus:ring-brand-500
focus:border-brand-500
outline-none
appearance-none
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

    <input
    type="checkbox"
    checked={form.requiresDepot}
    onChange={(e) =>
      setForm({
        ...form,
        requiresDepot:
          e.target.checked,
      })
    }
  />

  <span
    className="
    text-sm
    font-medium
    gap-4
    ml-2
    "
  >
    Requiere pasar por depósito antes de esta visita
  </span>
        <button
  onClick={createOrder}
  className="
  w-full
  bg-brand-600
  hover:bg-brand-700
shadow-sm
hover:shadow-md
hover:-translate-y-0.5
transition-all
duration-200
  text-white
  py-3
  rounded-xl
  mt-6
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
      <h2 className="
  text-2xl
  font-semibold">
  
  Pedidos</h2>
<div className="relative mt-6 mb-4">

  <input
    placeholder="Buscar por cliente..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="
w-full
border
mt-2
mb-2
border-slate-200
bg-white
rounded-xl
text-slate-500
px-4
py-3
shadow-sm
transition-all
duration-200
focus:ring-2
focus:ring-brand-500
focus:border-brand-500
outline-none
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
<div
    className="
    text-sm
    font-medium
    text-slate-500
    mb-2
    mt-6
    ml-2
    "
  >
    Fecha
  </div>
  <div className="relative mb-4">
<input className="
w-full
text-slate-500
border
border-slate-200
bg-white
rounded-xl
px-4
py-3
shadow-sm
transition-all
duration-200
focus:ring-2
focus:ring-brand-500
focus:border-brand-500
outline-none
appearance-none
"
placeholder="Fecha"
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
 <Calendar
    size={18}
    className="
    absolute
    right-4
    top-6
    -translate-y-1/2
    pointer-events-none
    text-slate-500
    "
  />
</div>

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
  {" - "}
{order.client?.address}
</h3>

          <div className="flex items-center gap-2 mt-2">
  <Calendar size={16} />
  {new Date(order.date)
    .toLocaleDateString("es-AR")}
</div>

          <div className="flex items-center gap-2 mt-2">
  <Clock3 size={16} />
  {
  order.shift === "MORNING"
    ? "Mañana"
    : order.shift === "AFTERNOON"
    ? "Tarde"
    : order.shift
}
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
<div
  className="
  flex
  flex-wrap
  gap-2
  mt-3
  "
>
  {order?.operations?.map(
    (op) => (
      <span
        key={op}
        className="
        bg-brand-100
        text-brand-700
        px-3
        py-1
        mb-2
        rounded-full
        text-xs
        font-medium
        "
      >
        {op === "DELIVERY"
          ? "Entrega"
          : op === "PICKUP"
          ? "Retira"
          : "Cobra"}
      </span>
      
      
    )
  )}{order.requiresDepot && (
  <span
  className="
  bg-brand-100
  text-brand-700
  px-3
  py-1
  rounded-full
  text-xs
  font-medium
  "
>
  Depósito
</span>
)}
  
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
    Editar
  </button>

        </div>
      ))}</div></div>
    </main>
  );
}