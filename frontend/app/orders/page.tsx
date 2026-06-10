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

      {form.clientId
        ? clients.find(
            c =>
              c.id ===
              Number(
                form.clientId
              )
          )?.name
        : "Seleccionar cliente"}

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
            hover:bg-slate-50
            cursor-pointer
            transition-all
            "
          >

            <div
              className="
              font-semibold
              "
            >
              {client.name}
            </div>

          </div>

        ))}

    </div>

  )}

</div>

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
focus:ring-blue-500
focus:border-blue-500
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
border-slate-200
bg-white
rounded-xl
text-slate-500
px-4
py-3
mb-4
shadow-sm
transition-all
duration-200
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
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
mt-4
mb-4
appearance-none
bg-white
text-slate-500
shadow-sm
transition-all
duration-200
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
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
        

        <input className="
w-full
border
border-slate-200
bg-white
rounded-xl
text-slate-500
px-4
py-3
mb-4
shadow-sm
transition-all
duration-200
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
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

    
        <button
  onClick={createOrder}
  className="
  w-full
  bg-blue-600
  hover:bg-blue-700
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
border
mt-2
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
focus:ring-blue-500
focus:border-blue-500
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

<input className="
w-full
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
focus:ring-blue-500
focus:border-blue-500
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