"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const routeMap = {
  "/dhq-admin": {
    label: "Overview",
  },
  "/dhq-admin/organizations": {
    label: "Organizations",
  },
  "/dhq-admin/users": {
    label: "Users Management",
  },
  "/dhq-admin/managers": {
    label: "Managers",
  },
  "/dhq-admin/clients": {
    label: "Clients",
  },
  "/dhq-admin/subscription-plans": {
    label: "Subscription Plans",
  },
  "/dhq-admin/payments": {
    label: "Payments",
  },
};

const Chevron = () => (
  <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0.149109 8.76421C0.347922 8.9575 0.67026 8.9575 0.869072 8.76421L4.9418 4.80462C5.03727 4.71179 5.09091 4.5859 5.09091 4.45463C5.09091 4.32336 5.03727 4.19747 4.9418 4.10465L0.869072 0.145055C0.67026 -0.0482346 0.347921 -0.0482345 0.149109 0.145055C-0.0497035 0.338345 -0.0497034 0.65173 0.149109 0.845019L3.86185 4.45463L0.149109 8.06425C-0.0497031 8.25754 -0.0497031 8.57092 0.149109 8.76421Z" fill="#3B7FF7" />
  </svg>
);

export default function DHQBreadCrumb() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const route = routeMap[pathname];
  const queryString = searchParams.toString();
  const subLabel = route?.sub?.[queryString];

  const label = route?.label ?? pathname.split("/").pop().replace(/-/g, " ");
  const icon = route?.icon ?? null;

  return (
    <div className="flex items-center gap-2 text-[14px] font-medium">
      <span className="flex items-center gap-1.5 grey-color">
        {icon}
        <Link href="/dhq-admin" className="capitalize">
          Dashboard
        </Link>
      </span>

      <Chevron />

      <span className={`capitalize font-medium ${subLabel ? "grey-color" : "dark-blue-color"}`}>
        {label}
      </span>

      {subLabel && (
        <>
          <Chevron />
          <span className="dark-blue-color font-medium">{subLabel}</span>
        </>
      )}
    </div>
  );
}
