"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const prodAdminLink = [
  {
    name: "Dashboard",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.8889 0.888864C12.5216 0.256126 13.4149 0 14.4375 0H16.2708C17.2935 0 18.1867 0.256126 18.8195 0.888864C19.4522 1.5216 19.7083 2.41486 19.7083 3.4375V5.27083C19.7083 6.29347 19.4522 7.18673 18.8195 7.81947C18.1867 8.45221 17.2935 8.70833 16.2708 8.70833H14.4375C13.4149 8.70833 12.5216 8.45221 11.8889 7.81947C11.2561 7.18673 11 6.29347 11 5.27083V3.4375C11 2.41486 11.2561 1.5216 11.8889 0.888864ZM12.8611 1.86114C12.5772 2.14506 12.375 2.62681 12.375 3.4375V5.27083C12.375 6.08153 12.5772 6.56327 12.8611 6.8472C13.1451 7.13113 13.6268 7.33333 14.4375 7.33333H16.2708C17.0815 7.33333 17.5633 7.13113 17.8472 6.8472C18.1311 6.56327 18.3333 6.08153 18.3333 5.27083V3.4375C18.3333 2.62681 18.1311 2.14506 17.8472 1.86114C17.5633 1.57721 17.0815 1.375 16.2708 1.375H14.4375C13.6268 1.375 13.1451 1.57721 12.8611 1.86114Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.888864 11.8889C1.5216 11.2561 2.41486 11 3.4375 11H5.27083C6.29347 11 7.18673 11.2561 7.81947 11.8889C8.45221 12.5216 8.70833 13.4149 8.70833 14.4375V16.2708C8.70833 17.2935 8.45221 18.1867 7.81947 18.8195C7.18673 19.4522 6.29347 19.7083 5.27083 19.7083H3.4375C2.41486 19.7083 1.5216 19.4522 0.888864 18.8195C0.256126 18.1867 0 17.2935 0 16.2708V14.4375C0 13.4149 0.256126 12.5216 0.888864 11.8889ZM1.86114 12.8611C1.57721 13.1451 1.375 13.6268 1.375 14.4375V16.2708C1.375 17.0815 1.57721 17.5633 1.86114 17.8472C2.14506 18.1311 2.62681 18.3333 3.4375 18.3333H5.27083C6.08153 18.3333 6.56327 18.1311 6.8472 17.8472C7.13113 17.5633 7.33333 17.0815 7.33333 16.2708V14.4375C7.33333 13.6268 7.13113 13.1451 6.8472 12.8611C6.56327 12.5772 6.08153 12.375 5.27083 12.375H3.4375C2.62681 12.375 2.14506 12.5772 1.86114 12.8611Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.35417 1.375C2.70882 1.375 1.375 2.70882 1.375 4.35417C1.375 5.99952 2.70882 7.33333 4.35417 7.33333C5.99952 7.33333 7.33333 5.99952 7.33333 4.35417C7.33333 2.70882 5.99952 1.375 4.35417 1.375ZM0 4.35417C0 1.94943 1.94943 0 4.35417 0C6.75891 0 8.70833 1.94943 8.70833 4.35417C8.70833 6.75891 6.75891 8.70833 4.35417 8.70833C1.94943 8.70833 0 6.75891 0 4.35417Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.3542 12.375C13.7088 12.375 12.375 13.7088 12.375 15.3542C12.375 16.9995 13.7088 18.3333 15.3542 18.3333C16.9995 18.3333 18.3333 16.9995 18.3333 15.3542C18.3333 13.7088 16.9995 12.375 15.3542 12.375ZM11 15.3542C11 12.9494 12.9494 11 15.3542 11C17.7589 11 19.7083 12.9494 19.7083 15.3542C19.7083 17.7589 17.7589 19.7083 15.3542 19.7083C12.9494 19.7083 11 17.7589 11 15.3542Z"
          fill="currentColor"
        />
      </svg>
    ),
    link: "/dhq-admin",
  },
  {
    name: "Organizations",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.1665 11H12.8332"
          stroke="currentColor"
          strokeWidth="1.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.1665 7.33325H12.8332"
          stroke="currentColor"
          strokeWidth="1.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.8332 19.2501V16.5001C12.8332 16.0139 12.64 15.5475 12.2962 15.2037C11.9524 14.8599 11.4861 14.6667 10.9998 14.6667C10.5136 14.6667 10.0473 14.8599 9.70348 15.2037C9.35966 15.5475 9.1665 16.0139 9.1665 16.5001V19.2501"
          stroke="currentColor"
          strokeWidth="1.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.50016 9.16675H3.66683C3.1806 9.16675 2.71428 9.3599 2.37047 9.70372C2.02665 10.0475 1.8335 10.5139 1.8335 11.0001V17.4167C1.8335 17.903 2.02665 18.3693 2.37047 18.7131C2.71428 19.0569 3.1806 19.2501 3.66683 19.2501H18.3335C18.8197 19.2501 19.286 19.0569 19.6299 18.7131C19.9737 18.3693 20.1668 17.903 20.1668 17.4167V8.25008C20.1668 7.76385 19.9737 7.29754 19.6299 6.95372C19.286 6.6099 18.8197 6.41675 18.3335 6.41675H16.5002"
          stroke="currentColor"
          strokeWidth="1.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 19.25V4.58333C5.5 4.0971 5.69315 3.63079 6.03697 3.28697C6.38079 2.94315 6.8471 2.75 7.33333 2.75H14.6667C15.1529 2.75 15.6192 2.94315 15.963 3.28697C16.3068 3.63079 16.5 4.0971 16.5 4.58333V19.25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    link: "/dhq-admin/organizations",
    subItem: [
      { name: "All Organizations", link: "/dhq-admin/organizations" },
      {
        name: "Active Organizations",
        link: "/dhq-admin/organizations?status=active",
      },
      {
        name: "Trial Organizations",
        link: "/dhq-admin/organizations?status=trial",
      },
    ],
  },
  {
    name: "Users",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    link: "/dhq-admin/users",
    subItem: [
      { name: "All Users", link: "/dhq-admin/users" },
      {
        name: "Active Users",
        link: "/dhq-admin/users?status=active",
      },
      {
        name: "Trial Users",
        link: "/dhq-admin/users?status=trial",
      },
    ],
  },
];

function ChevronIcon({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2 4L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SideBarLinks({ role = "prod-admin", collapsed = false }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.toString() ? `?${searchParams.toString()}` : "";

  const links = role === "prod-admin" ? prodAdminLink : prodAdminLink;

  const getInitialOpen = () => {
    const idx = links.findIndex((link) =>
      link.subItem?.some((sub) => pathname.startsWith(sub.link.split("?")[0])),
    );
    return idx !== -1 ? idx : null;
  };

  const [openDropdown, setOpenDropdown] = useState(getInitialOpen);

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const activeClass = "dark-blue-color py-1.5 bg-[linear-gradient(90deg,rgba(211,224,247,0)_0%,rgba(255,255,255,0.4)_52.74%)] font-bold";
  const inactiveClass = "grey-color hover:text-[#153875]! font-normal";

  return (
    <ul className="flex flex-col gap-3 sidebarLinks">
      {links.map((link, index) => {
        const isActive =
          pathname === link.link ||
          link.subItem?.some((sub) =>
            pathname.startsWith(sub.link.split("?")[0]),
          );
        const isOpen = openDropdown === index;

        return (
          <li key={link.link}>
            {link.subItem ? (
              <>
                {collapsed ? (
                  <Link
                    href={link.link}
                    title={link.name}
                    className={`flex items-center justify-center px-2 text-[14px] transition-all duration-200 min-h-8.5 w-full rounded-3xl
                      ${isActive ? activeClass : inactiveClass}`}
                  >
                    {link.icon}
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleDropdown(index)}
                    className={`flex items-center justify-between pr-3 gap-3 text-[14px] cursor-pointer transition-all duration-200 min-h-8.5 w-full rounded-3xl
                      ${isActive ? activeClass : inactiveClass}`}
                  >
                    <span className="flex items-center gap-3">
                      {link.icon}
                      {link.name}
                    </span>
                    <ChevronIcon open={isOpen} />
                  </button>
                )}

                {!collapsed && isOpen && (
                  <ul className="ml-2.5 mt-1 flex flex-col">
                    {(() => {
                      const activeSubIndex = link.subItem.findIndex(
                        (sub) =>
                          pathname + currentSearch === sub.link ||
                          (sub.link.split("?")[0] === pathname && !sub.link.includes("?") && !currentSearch)
                      );
                      return link.subItem.map((sub, subIndex) => {
                        const subActive = subIndex === activeSubIndex;
                        const isBeforeActive = activeSubIndex !== -1 && subIndex < activeSubIndex;
                        return (
                          <li key={sub.link} className="relative pl-4">
                            {isBeforeActive && (
                              <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#153875]" />
                            )}
                            {subActive && (
                              <span className="absolute left-0 top-0 w-4 h-[50%] border-l-2 border-b-2 border-[#153875] rounded-bl-lg" />
                            )}
                            <Link
                              href={sub.link}
                              className={`block px-2 py-1.5 rounded-lg text-[14px] transition-all duration-200
                                ${subActive ? "dark-blue-color font-medium" : "text-[#727272] hover:text-[#153875]!"}`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        );
                      });
                    })()}
                  </ul>
                )}
              </>
            ) : (
              <Link
                href={link.link}
                title={collapsed ? link.name : undefined}
                className={`flex items-center text-[14px] rounded-3xl transition-all duration-200 min-h-8.5
                  ${collapsed ? "justify-center px-2" : "gap-3"}
                  ${isActive ? activeClass : inactiveClass}`}
              >
                {link.icon}
                {!collapsed && link.name}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
