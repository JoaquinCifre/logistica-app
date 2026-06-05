"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { use } from "react";

export default function ClientPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = use(params);
  const [message, setMessage] =
  useState("");

const [messageType, setMessageType] =
  useState<
    "success" | "error"
  >("success");
  const [client, setClient] =
    useState<any>(null);

  const loadClient =
    async () => {
      const response =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/clients/${id}`
        );

      setClient(response.data);
    };
const saveClient =
  async () => {
    try {
      await axios.patch(
  `${process.env.NEXT_PUBLIC_API_URL}/clients/${id}`,
  client
);

window.location.href = "/";

    } catch (error) {
      console.error(error);
      setMessage(
  "Error"
);

setMessageType(
  "success"
);

setTimeout(() => {
  setMessage("");
}, 3000);
    }
  };

  const deleteClient =
  async () => {

    const confirmed =
      confirm(
        "¿Eliminar cliente?"
      );

    if (!confirmed) {
      return;
    }

    try {
  await axios.patch(
  `${process.env.NEXT_PUBLIC_API_URL}/clients/${id}/deactivate`
);

  window.location.href = "/";

} catch (error) {
  setMessage(
  "No se puede eliminar un cliente con pedidos asociados"
);

setMessageType(
  "success"
);

setTimeout(() => {
  setMessage("");
}, 3000);
}}
  useEffect(() => {
    loadClient();
  }, []);

  if (!client) {
    return <div>Cargando...</div>;
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
  Editar Cliente
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
      <button
  onClick={() =>
    window.location.href = "/"
  }
 className="
px-4
py-3
mb-6
rounded-xl
font-semibold
border
border-slate-300
bg-white
hover:bg-slate-50
text-slate-700
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
<label className="
block
mb-2
text-sm
font-semibold
text-slate-700
">
  Nombre
</label>

<input
  value={client.name || ""}
  onChange={(e) =>
    setClient({
      ...client,
      name: e.target.value,
    })
  }
  className="
w-full
border
border-slate-300
rounded-xl
p-3
mb-5
"
/>

<label className="
block
mb-2
text-sm
font-semibold
text-slate-700
">
  Dirección
</label>

<input
  value={client.address || ""}
  onChange={(e) =>
    setClient({
      ...client,
      address: e.target.value,
    })
  }
  className="
w-full
border
border-slate-300
rounded-xl
p-3
mb-5
"
/>

<label className="
block
mb-2
text-sm
font-semibold
text-slate-700
">
  Teléfono
</label>

<input
  value={client.phone || ""}
  onChange={(e) =>
    setClient({
      ...client,
      phone: e.target.value,
    })
  }
  className="
w-full
border
border-slate-300
rounded-xl
p-3
mb-5
"
/>

<label className="
block
mb-2
text-sm
font-semibold
text-slate-700
">
  Horario
</label>

<input
  value={client.schedule || ""}
  onChange={(e) =>
    setClient({
      ...client,
      schedule: e.target.value,
    })
  }
  className="
w-full
border
border-slate-300
rounded-xl
p-3
mb-5
"
/>

<label className="
block
mb-2
text-sm
font-semibold
text-slate-700
">
  Persona de contacto
</label>

<input
  value={client.contactName || ""}
  onChange={(e) =>
    setClient({
      ...client,
      contactName: e.target.value,
    })
  }
  className="
w-full
border
border-slate-300
rounded-xl
p-3
mb-5
"
/>

<label className="
block
mb-2
text-sm
font-semibold
text-slate-700
">
  Instrucciones de entrega
</label>

<textarea
  value={
    client.deliveryInstructions || ""
  }
  onChange={(e) =>
    setClient({
      ...client,
      deliveryInstructions:
        e.target.value,
    })
  }
  className="
w-full
border
border-slate-300
rounded-xl
p-3
mb-5
"
/>

<label className="
block
mb-2
text-sm
font-semibold
text-slate-700
">
  Observaciones
</label>

<textarea
  value={client.notes || ""}
  onChange={(e) =>
    setClient({
      ...client,
      notes: e.target.value,
    })
  }
  className="
w-full
border
border-slate-300
rounded-xl
p-3
mb-5
"
/>
<div className="flex gap-3">

  <button
  onClick={saveClient}
  className="
bg-indigo-600
hover:bg-indigo-700
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

  <button
  onClick={deleteClient}
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
  Desactivar
</button>

</div></div>
    </main>
  );
}