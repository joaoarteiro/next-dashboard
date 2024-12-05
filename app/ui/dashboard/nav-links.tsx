"use client";
/* Since usePathname() is a hook, you'll need to turn nav-links.tsx into a Client Component.
 Add React's "use client" directive to the top of the file */

import {
  UserGroupIcon,
  HomeIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    name: "Resources",
    href: "/dashboard/invoices",
    icon: UserGroupIcon,
  },
  {
    name: "Projects",
    href: "/dashboard/customers",
    icon: ClipboardIcon,
  },
];

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${
              pathname === link.href ? "bg-sky-100 text-blue-600" : ""
            }`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
