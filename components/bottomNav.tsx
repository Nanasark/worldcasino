"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gift, Ticket, Gamepad2 } from "lucide-react";

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/mystery-boxes", icon: Gift, label: "Boxes" },
    { href: "/raffles", icon: Ticket, label: "Raffles" },
    { href: "/games", icon: Gamepad2, label: "Games" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex flex-col items-center p-2 ${
                pathname === item.href ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <item.icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
