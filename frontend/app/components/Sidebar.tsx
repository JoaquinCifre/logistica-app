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
  "#162355",
    color: "white",
   
  }}
>
   <div
  className="
  flex
  items-center
  justify-center
  
  gap-3
  py-6
  md:mb-6
  "
>
  <Truck size={30} className="text-brand-300"/>

  <span
  className="
  text-lg
  md:text-xl
  font-bold
  text-brand-100
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
  mt-2 
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
  className={`
    px-4
    py-3
    rounded-xl
    text-white
    whitespace-nowrap
    transition-all
    duration-200
    
    ${
      pathname === link.href
        ? "bg-brand-800 shadow-md border border-brand-500"
        : ""
    }
md:mb-4
mb-4
    md:mx-3
    md:hover:bg-brand-800
    md:hover:translate-x-1
  `}
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