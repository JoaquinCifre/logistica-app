"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Truck,
  Package,
  Users,
} from "lucide-react";
export default function Sidebar() {
  const pathname = usePathname();


  const links = [
  {
    href: "/operations",
    label: "Operaciones",
    icon: Truck,
  },
  {
    href: "/orders",
    label: "Pedidos",
    icon: Package,
  },
  {
    href: "/",
    label: "Clientes",
    icon: Users,
  },
];


  return (
  <aside
  className="
  w-full
  md:w-[240px]
  md:min-h-screen
  "
  style={{
    background:
      "linear-gradient(180deg,#0F172A 0%,#111827 100%)",
    color: "white",
   
  }}
>
   <div
  className="
  flex
  items-center
  justify-center
  
  gap-3
  mb-4
  mt-4
  md:mb-10
  "
>
  <Truck size={30} />

  <span
  className="
  text-lg
  md:text-xl
  font-bold
  whitespace-nowrap
  "
>
    Logística CLS
  </span>
</div>

  <div
  className="
  flex
  flex-row
  md:flex-col
  gap-2
  mt-8 
  md:mt-0
  justify-center
  "
>
      {links.map((link) => {

  const Icon = link.icon;

  return (
    <Link
      key={link.href}
      href={link.href}
      style={{
  padding: "10px 14px",
  borderRadius: "10px",
  textDecoration: "none",
  color: "white",
  background:
    pathname === link.href
      ? "#2563EB"
      : "transparent",
  transition: "0.2s",
  whiteSpace: "nowrap",
}}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Icon size={18} />
        {link.label}
      </div>
    </Link>
  );
})}

    </div>
  </aside>
);
}