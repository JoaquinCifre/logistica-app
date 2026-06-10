"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  ChevronDown,
  ChevronRight,
  Phone,
  User,
  Clock3,
  Package,
  FileText,
} from "lucide-react";
interface Client {
  id: number;
  name: string;
  address: string;
  phone: string;
  schedule: string;
  notes: string;
  latitude?: number;
longitude?: number;
contactName?: string;
deliveryInstructions?: string;
type: string;
}

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
const [message, setMessage] =
  useState("");

const [messageType, setMessageType] =
  useState<
    "success" | "error"
  >("success");
  const [search, setSearch] =
  useState("");
  const [expandedClient,
  setExpandedClient] =
  useState<number | null>(
    null
  );
  

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    schedule: "",
    notes: "",
    type: ""
  });

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients`);
      setClients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const createClient = async () => {
    try {
      if (!form.name.trim()) {
  setMessage(
  "Ingrese un nombre"
);

setMessageType(
  "error"
);

setTimeout(() => {
  setMessage("");
}, 3000);
  return;
}

if (!form.address.trim()) {
  setMessage(
  "Ingrese una dirección"
);

setMessageType(
  "error"
);

setTimeout(() => {
  setMessage("");
}, 3000);
  return;
}

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, form);

      setForm({
        name: "",
        address: "",
        phone: "",
        schedule: "",
        notes: "",
        type:""
      });

      fetchClients();
      setMessage(
  "Cliente creado correctamente"
);

setMessageType(
  "success"
);

setTimeout(() => {
  setMessage("");
}, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main

  className="
  max-w-[1200px]
  mx-auto
"
>
      <h2
  className="
  text-3xl
  font-bold
  text-slate-900
  mb-8
 
  "
>
  Clientes
</h2>
{message && (

  <div
    className={`
      mb-6
      p-4
      rounded-xl
      border
      shadow-sm
      font-medium
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
  xl:col-span-1
bg-slate-50
hover:bg-white
max-w-[800px]
mx-auto
w-full
border
border-slate-200
rounded-2xl
p-3
mb-4
shadow-sm
transition-all
duration-200
"
>
  
      <h2
 className="
flex
items-center
justify-center
gap-3
cursor-pointer
font-semibold
text-2xl
mb-6
mt-4
text-slate-800
"
>
  Lista de Clientes
</h2>
  <input
    className="
    w-full
    border
    border-slate-300
    rounded-xl
    p-3
    mb-3
    "
    placeholder="Buscar cliente..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />


<div
  className="
  xl:col-span-2
  bg-white
  rounded-2xl
  border
  border-slate-200
  shadow-sm
  p-6
  "
>
  



{clients
  .filter((client) =>
    (client.name ?? "")
  .toLowerCase()
  .includes(search.toLowerCase()) ||

(client.address ?? "")
  .toLowerCase()
  .includes(search.toLowerCase()) ||

(client.phone ?? "")
  .toLowerCase()
  .includes(search.toLowerCase()) ||

(client.contactName ?? "")
  .toLowerCase()
  .includes(search.toLowerCase()) ||

(client.notes ?? "")
  .toLowerCase()
  .includes(search.toLowerCase())
  )
  .map((client) => (
    <div
      key={client.id}
      className="
      w-full
bg-slate-50
hover:bg-white
border
mt-4
border-slate-200
rounded-2xl


w-full
p-3
mb-4
shadow-sm
hover:shadow-md
transition-all
duration-200
"
    >
      <div
  onClick={() =>
    setExpandedClient(
      expandedClient === client.id
        ? null
        : client.id
    )
  }
  className="
  flex
  items-center
  gap-3
  cursor-pointer
  font-semibold
  text-lg
  "
>
  {expandedClient === client.id ? (
    <ChevronDown size={18} />
  ) : (
    <ChevronRight size={18} />
  )}

  <div>

  <div
    className="
    font-semibold
    text-lg
    "
  >
    {client.name}
    {client.type === "SUPPLIER" ? (
  <span
    className="
    ml-2
    px-2
    py-1
    rounded-full
    text-xs
    bg-violet-100
    text-violet-700
    "
  >
    Proveedor
  </span>
) : (
  <span
    className="
    ml-2
    px-2
    py-1
    rounded-full
    text-xs
    bg-blue-100
    text-blue-700
    "
  >
    Cliente
  </span>
)}
  </div>

  <div
    className="
    text-sm
    text-slate-500
    "
  >
    {client.address}
  </div>

</div>
</div>
 {expandedClient === client.id && (

    <div className="
mt-4
pt-4
border-t
border-slate-200
">

      

      <div className="
flex
items-center
gap-2
text-slate-700
mt-2
">
  <Phone size={16} />
  {client.phone}
</div>
{client.schedule && (
  <div className="
flex
items-center
gap-2
text-slate-700
mt-2
">
  <Clock3 size={16} />
  {client.schedule}
</div>
)}

{client.contactName && (
  <div className="
flex
items-center
gap-2
text-slate-700
mt-2
">
  <User size={16} />
  {client.contactName}
</div>
)}

{client.deliveryInstructions && (
  <div className="
flex
items-center
gap-2
text-slate-700
mt-2
">
  <Package size={16} />
  {client.deliveryInstructions}
</div>
)}

{client.notes && (
  <div className="
flex
items-center
gap-2
text-slate-700
mt-2
">
  <FileText size={16} />
  {client.notes}
</div>
)}
      

      <button
        onClick={() =>
          window.location.href =
            `/clients/${client.id}`
        }
        className="
mt-4
bg-blue-600
hover:bg-blue-700
text-white
px-4
py-2
rounded-xl
font-medium
transition-all
"
      >
        Editar
      </button>

    </div>

  )}

</div>

      
   

    
  ))}</div></div></div>

  <div
  className="
  bg-white
  rounded-2xl
   max-w-[800px]
mx-auto
w-full
  border
  border-slate-200
  p-4
  shadow-sm
  mt-4
  "
>
      <h2
  className="
  text-2xl
  font-semibold
  mb-10
  mt-4
  flex
  justify-center
  "
>
  Nuevo Cliente
</h2>

      <div className="
  flex
  flex-col
  gap-4
">
        <div>
  <label
    className="
    block
    mb-2
    flex
    justify-center
    text-base
    font-semibold
    text-slate-700
    "
  >
    Nombre
  </label>

  <input
    className="
    w-full
    border
    border-slate-300
    rounded-xl
    p-3
    mb-4
    "
    placeholder="Nombre"
    value={form.name}
    onChange={(e) =>
      setForm({
        ...form,
        name: e.target.value,
      })
    }
  />
</div>

 <div>
  <label className="block text-sm text-slate-500 mb-2">
    Tipo
  </label>

  <select
    value={form.type}
    onChange={(e) =>
      setForm({
        ...form,
        type: e.target.value,
      })
    }
    className="
    w-full
    border
    border-slate-200
    rounded-xl
    px-4
    py-3
    "
  >
    <option value="CLIENT">
      Cliente
    </option>

    <option value="SUPPLIER">
      Proveedor
    </option>
  </select>
</div>       
<div>
  <label
    className="
    block
    mb-2
     flex
    justify-center
    text-base
    font-semibold
    text-slate-700
    "
  >
    Dirección
  </label>

  <input
    className="
    w-full
    border
    border-slate-300
    rounded-xl
    p-3
    mb-4
    "
    placeholder="Dirección"
    value={form.address}
    onChange={(e) =>
      setForm({
        ...form,
        address: e.target.value,
      })
    }
  />
</div>

        <div>
  <label
    className="
    block
    mb-2
     flex
    justify-center
    text-base
    font-semibold
    text-slate-700
    "
  >
  Teléfono
  </label>

  <input
    className="
    w-full
    border
    border-slate-300
    rounded-xl
    p-3
    mb-4
    "
    placeholder="Teléfono"
    value={form.phone}
    onChange={(e) =>
      setForm({
        ...form,
        phone: e.target.value,
      })
    }
  />
</div>

        
<div>
  <label
    className="
    block
    mb-2
     flex
    justify-center
    text-base
    font-semibold
    text-slate-700
    "
  >
    Horario
  </label>

  <input
    className="
    w-full
    border
    border-slate-300
    rounded-xl
    p-3
    mb-4
    "
    placeholder="Horario"
    value={form.schedule}
    onChange={(e) =>
      setForm({
        ...form,
        schedule: e.target.value,
      })
    }
  />
</div>

        <label
  className="
  lg:col-span-3
block
mb-2
 flex
    justify-center
text-base
font-semibold
text-slate-800
"
>
  Observaciones
</label>

        <input
  className="
  lg:col-span-3
  w-full
  border
  border-slate-300
  rounded-xl
  p-3
  mb-6
  "
          placeholder="Observaciones"
          value={form.notes}
          onChange={(e) =>
            setForm({ ...form, notes: e.target.value })
          }
        />

        
<button
  onClick={createClient}
  className="
 
  w-full
  bg-blue-600
  hover:bg-blue-700
  text-white
  py-3
  rounded-xl
  font-semibold
  transition-all
  "
>
  Crear Cliente
</button>
        
      </div>

      </div>
    </main>
  );
}