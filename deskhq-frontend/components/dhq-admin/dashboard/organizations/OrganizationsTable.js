"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical, Eye, Pencil, Ban } from "lucide-react";
import AvatarStack from "./AvatarStack";

const organizations = [
  { id: 1, name: "Creativibe Labs", email: "info@Creativibelabs.com", avatarColor: "#3B7FF7", plan: "Free", users: 6, clients: 6, revenue: "$20", status: "Active", storage: "100GB", createdDate: "16-05-2026" },
  { id: 2, name: "Devmont Digital", email: "info@Creativibelabs.com", avatarColor: "#0CCC67", plan: "Starter", users: 6, clients: 6, revenue: "$20", status: "Active", storage: "100GB", createdDate: "16-05-2026" },
  { id: 3, name: "Creativibe Labs", email: "info@Creativibelabs.com", avatarColor: "#3B7FF7", plan: "Pro", users: 6, clients: 6, revenue: "$20", status: "Active", storage: "100GB", createdDate: "16-05-2026" },
  { id: 4, name: "Creativibe Labs", email: "info@Creativibelabs.com", avatarColor: "#3B7FF7", plan: "Agency", users: 6, clients: 6, revenue: "$20", status: "Active", storage: "100GB", createdDate: "16-05-2026" },
  { id: 5, name: "Creativibe Labs", email: "info@Creativibelabs.com", avatarColor: "#3B7FF7", plan: "Starter", users: 6, clients: 6, revenue: "$20", status: "Active", storage: "100GB", createdDate: "16-05-2026" },
  { id: 6, name: "Creativibe Labs", email: "info@Creativibelabs.com", avatarColor: "#3B7FF7", plan: "Free", users: 6, clients: 6, revenue: "$20", status: "Active", storage: "100GB", createdDate: "16-05-2026" },
  { id: 7, name: "Creativibe Labs", email: "info@Creativibelabs.com", avatarColor: "#3B7FF7", plan: "Agency", users: 6, clients: 6, revenue: "$20", status: "Active", storage: "100GB", createdDate: "16-05-2026" },
  { id: 8, name: "Creativibe Labs", email: "info@Creativibelabs.com", avatarColor: "#3B7FF7", plan: "Free", users: 6, clients: 6, revenue: "$20", status: "Active", storage: "100GB", createdDate: "16-05-2026" },
];

const STATUS_STYLES = {
  Active: "bg-[#0CCC67]/20 text-[#0CCC67]",
  Trial: "bg-[#3B7FF7]/20 text-[#3B7FF7]",
  Suspended: "bg-[#F11D1D]/20 text-[#F11D1D]",
};

const columns = ["Organization", "Plan", "Users", "Client", "Revenue", "Status", "Storage", "Created Date"];

const MENU_ACTIONS = [
  { key: "view", label: "View", icon: Eye },
  { key: "edit", label: "Edit", icon: Pencil },
  { key: "suspend", label: "Suspend", icon: Ban, danger: true },
];

function RowActionsMenu({ org, onAction }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-flex">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="grey-color hover:dark-blue-color transition-colors duration-150 cursor-pointer"
        aria-label="Row actions"
      >
        <MoreVertical className="w-4 h-4" strokeWidth={2} />
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-full mt-1 z-20 w-36 bg-white border border-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.15)] rounded-2xl py-2 flex flex-col"
        >
          {MENU_ACTIONS.map(({ key, label, icon: Icon, danger }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setOpen(false);
                onAction?.(key, org);
              }}
              className={`flex items-center gap-2.5 px-4 py-2 text-[13px] font-normal text-left cursor-pointer transition-colors duration-150 ${
                danger ? "text-[#F11D1D] hover:bg-[#F11D1D]/10" : "text-[#2C2C2C] hover:bg-[#F0F4FC]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrganizationsTable({ onView }) {
  const [selected, setSelected] = useState([]);

  const allSelected = selected.length === organizations.length;

  const toggleAll = () => {
    setSelected(allSelected ? [] : organizations.map((org) => org.id));
  };

  const toggleOne = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="bg-white/60 border-white border shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[32px] overflow-hidden">
      <div className="px-6 py-5">
        <h2 className="text-[16px] font-medium dark-blue-color">Organizations</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse">
          <thead>
            <tr className="text-[14px] font-normal dark-blue-color">
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="w-[18px] h-[18px] rounded-[6px] accent-[#3B7FF7] cursor-pointer"
                />
              </th>
              {columns.map((col) => (
                <th key={col} className="px-4 py-3 text-left whitespace-nowrap">
                  {col}
                </th>
              ))}
              <th className="w-12 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {organizations.map((org) => {
              const isSelected = selected.includes(org.id);
              return (
                <tr
                  key={org.id}
                  onClick={() => onView?.(org)}
                  className={`text-[14px] cursor-pointer transition-colors duration-150 ${
                    isSelected
                      ? "bg-[#F0F4FC]"
                      : "bg-white/60 hover:bg-[#F0F4FC]/70"
                  }`}
                >
                  <td className="px-6 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOne(org.id)}
                      className="w-[18px] h-[18px] rounded-[6px] accent-[#3B7FF7] cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-white text-[14px] font-medium shrink-0"
                        style={{ backgroundColor: org.avatarColor }}
                      >
                        {org.name.charAt(0)}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-normal text-[#2C2C2C]">{org.name}</span>
                        <span className="text-[12px] font-normal primary-blue-color">{org.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-[#2C2C2C]">{org.plan}</td>
                  <td className="px-4 py-3">
                    <AvatarStack count={org.users} />
                  </td>
                  <td className="px-4 py-3">
                    <AvatarStack count={org.clients} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-normal text-[#0CCC67]">{org.revenue}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center justify-center rounded-[20px] py-1.5 px-3.5 text-[12px] font-normal ${
                        STATUS_STYLES[org.status] ?? STATUS_STYLES.Active
                      }`}
                    >
                      {org.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap primary-blue-color">{org.storage}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-[#2C2C2C]">{org.createdDate}</td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <RowActionsMenu
                      org={org}
                      onAction={(action, row) => {
                        if (action === "view") onView?.(row);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
