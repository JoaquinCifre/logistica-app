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
    style={{
      width: "260px",
      minHeight: "100vh",
      background:
  "linear-gradient(180deg,#0F172A 0%,#111827 100%)",
      color: "white",
      padding: "24px",
    }}
  >
    <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "40px",
  }}
>
  <Truck size={34} />

  <span
    style={{
      fontSize: "24px",
      fontWeight: 700,
    }}
  >
    Logística CLS
  </span>
</div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {links.map((link) => {

  const Icon = link.icon;

  return (
    <Link
      key={link.href}
      href={link.href}
      style={{
        padding: "12px 16px",
        borderRadius: "10px",
        textDecoration: "none",
        color: "white",
        background:
          pathname === link.href
            ? "#2563EB"
            : "transparent",
        transition: "0.2s",
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