"use client";

import { useEffect } from "react";
import {
  X,
  Pencil,
  Ban,
  ChevronRight,
  Crown,
  UserPlus,
  Building2,
  UserX,
  Wallet,
} from "lucide-react";

const ACTIVITY_ICONS = {
  manager_added: { icon: UserPlus, bg: "#0CCC67" },
  subscription_upgraded: { icon: Building2, bg: "#3B7FF7" },
  user_suspended: { icon: UserX, bg: "#F11D1D" },
  payment_received: { icon: Wallet, bg: "#0CCC67" },
};

function InfoRow({ label, value, valueClassName = "text-[#2C2C2C]" }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-[#FBFCFE] rounded-[10px] py-1.5 px-2.5">
      <span className="text-[14px] font-normal grey-color">{label}</span>
      <span className={`text-[14px] font-normal whitespace-nowrap ${valueClassName}`}>{value}</span>
    </div>
  );
}

function LinkRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-[#FBFCFE] rounded-[10px] py-1.5 px-2.5">
      <span className="text-[14px] font-normal grey-color">{label}</span>
      <button
        type="button"
        className="flex items-center gap-1 text-[14px] font-normal primary-blue-color cursor-pointer hover:underline"
      >
        {value}
        <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="text-[14px] font-normal text-[#2C2C2C] px-1">{title}</h3>
      <div className="flex flex-col gap-[5px] bg-[#ECF1FB] rounded-[28px] p-2.5 sm:p-4">{children}</div>
    </div>
  );
}

export default function OrganizationViewPanel({ organization, onClose, onEdit, onSuspend }) {
  useEffect(() => {
    if (!organization) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [organization, onClose]);

  if (!organization) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close organization panel"
        onClick={onClose}
        className="absolute inset-0 bg-[#15387533] backdrop-blur-[2px] cursor-default"
      />

      <aside className="relative h-screen w-full max-w-[460px] overflow-y-auto bg-[#FFFFFF66] backdrop-blur-md border-white border shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-l-[32px] p-3.5 flex flex-col gap-2.5 animate-slide-in">
        <div className="flex items-center justify-between gap-3 px-1">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grey-color hover:dark-blue-color transition-colors duration-150 cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onEdit?.(organization)}
              className="flex items-center gap-2 rounded-[17px] py-1 px-3.5 text-[14px] font-normal text-[#2C2C2C] border border-[#3B7FF7] cursor-pointer hover:bg-[#3B7FF7]/10 transition-colors duration-150"
            >
              <Pencil className="w-3.5 h-3.5 primary-blue-color" strokeWidth={2} />
              Edit
            </button>
            <button
              type="button"
              onClick={() => onSuspend?.(organization)}
              className="flex items-center gap-2 rounded-[17px] py-1 px-3.5 text-[14px] font-normal text-[#2C2C2C] border border-[#F11D1D] cursor-pointer hover:bg-[#F11D1D]/10 transition-colors duration-150"
            >
              <Ban className="w-3.5 h-3.5 text-[#F11D1D]" strokeWidth={2} />
              Suspend
            </button>
          </div>
        </div>

        <div className="flex items-center gap-5 bg-[#ECF1FB] rounded-[28px] p-5">
          <span
            className="w-[90px] h-[90px] rounded-full flex items-center justify-center text-white text-[28px] font-medium shrink-0"
            style={{ backgroundColor: organization.avatarColor ?? "#3B7FF7" }}
          >
            {organization.ownerName?.charAt(0) ?? "?"}
          </span>
          <div className="flex flex-col gap-0.5 min-w-0">
            <h2 className="text-[24px] sm:text-[32px] font-medium text-[#2C2C2C] truncate">{organization.ownerName}</h2>
            <span className="text-[14px] sm:text-[16px] font-normal primary-blue-color truncate">{organization.ownerEmail}</span>
            <span className="text-[10px] font-normal grey-color">{organization.lastSeenAt}</span>
          </div>
        </div>

        <SectionCard title="Organization Info">
          <InfoRow label="Domain" value={organization.domain} />
          <InfoRow label="Created date" value={organization.createdDate} />
          <InfoRow label="Owner" value={organization.ownerName} />
          <LinkRow label="Users" value={`${organization.usersCount} Active`} />
          <LinkRow label="Client" value={`${organization.clientsCount} Active`} />
        </SectionCard>

        <SectionCard title="Subscription Card">
          <InfoRow
            label="Current plan"
            value={
              <span className="flex items-center gap-1.5 primary-blue-color">
                <Crown className="w-4 h-4" strokeWidth={2} />
                {organization.plan}
              </span>
            }
            valueClassName="primary-blue-color"
          />
          <InfoRow label="Renewal date" value={organization.renewalDate} />
          <InfoRow label="Usage" value={organization.usage} />
          <InfoRow label="Current Pay" value={organization.currentPay} />
        </SectionCard>

        <div className="flex flex-col gap-2.5">
          <h3 className="text-[14px] font-normal text-[#2C2C2C] px-1">Recent Activity Timeline</h3>
          <div className="bg-[#ECF1FB] rounded-[28px] p-5">
            <ul className="flex flex-col">
              {organization.activity.map((event, index) => {
                const meta = ACTIVITY_ICONS[event.type] ?? ACTIVITY_ICONS.manager_added;
                const Icon = meta.icon;
                const isLast = index === organization.activity.length - 1;
                return (
                  <li key={`${event.type}-${event.date}`} className="flex items-start gap-3">
                    <span className="flex flex-col items-center">
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: meta.bg }}
                      >
                        <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                      </span>
                      {!isLast && <span className="w-px flex-1 min-h-[28px] bg-[#3B7FF7]" />}
                    </span>
                    <div className="flex items-center justify-between gap-3 flex-1 pb-7 pt-1">
                      <span className="text-[14px] font-normal text-[#2C2C2C]">{event.label}</span>
                      <span className="text-[14px] font-normal text-[#2C2C2C] whitespace-nowrap">{event.date}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
