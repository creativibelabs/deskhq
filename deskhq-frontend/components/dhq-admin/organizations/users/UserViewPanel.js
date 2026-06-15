"use client";

import { useEffect } from "react";
import {
  X,
  Pencil,
  Ban,
  ChevronRight,
  Crown,
  UserCog,
  UserX,
  Wallet,
  LogIn,
} from "lucide-react";

const ACTIVITY_ICONS = {
  profile_updated: { icon: UserCog, bg: "#3B7FF7" },
  plan_upgraded: { icon: Crown, bg: "#3B7FF7" },
  account_suspended: { icon: UserX, bg: "#F11D1D" },
  payment_received: { icon: Wallet, bg: "#0CCC67" },
  login_detected: { icon: LogIn, bg: "#0CCC67" },
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

const STATUS_STYLES = {
  Active: "bg-[#0CCC67]/20 text-[#0CCC67]",
  Trial: "bg-[#3B7FF7]/20 text-[#3B7FF7]",
  Suspended: "bg-[#F11D1D]/20 text-[#F11D1D]",
};

export default function UserViewPanel({ user, onClose, onEdit, onSuspend }) {
  useEffect(() => {
    if (!user) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [user, onClose]);

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close user panel"
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
              onClick={() => onEdit?.(user)}
              className="flex items-center gap-2 rounded-[17px] py-1 px-3.5 text-[14px] font-normal text-[#2C2C2C] border border-[#3B7FF7] cursor-pointer hover:bg-[#3B7FF7]/10 transition-colors duration-150"
            >
              <Pencil className="w-3.5 h-3.5 primary-blue-color" strokeWidth={2} />
              Edit
            </button>
            <button
              type="button"
              onClick={() => onSuspend?.(user)}
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
            style={{ backgroundColor: user.avatarColor ?? "#3B7FF7" }}
          >
            {user.name?.charAt(0) ?? "?"}
          </span>
          <div className="flex flex-col gap-0.5 min-w-0">
            <h2 className="text-[24px] sm:text-[32px] font-medium text-[#2C2C2C] truncate">{user.name}</h2>
            <span className="text-[14px] sm:text-[16px] font-normal primary-blue-color truncate">{user.email}</span>
            <span className="text-[10px] font-normal grey-color">{user.lastSeenAt}</span>
          </div>
        </div>

        <SectionCard title="User Info">
          <InfoRow label="Plan" value={user.plan} />
          <InfoRow label="Created date" value={user.createdDate} />
          <InfoRow
            label="Status"
            value={
              <span
                className={`inline-flex items-center justify-center rounded-[20px] py-1 px-3 text-[12px] font-normal ${
                  STATUS_STYLES[user.status] ?? STATUS_STYLES.Active
                }`}
              >
                {user.status}
              </span>
            }
          />
          <LinkRow label="Users" value={`${user.users * 5} Active`} />
          <LinkRow label="Clients" value={`${user.clients * 5} Active`} />
        </SectionCard>

        <SectionCard title="Subscription">
          <InfoRow
            label="Current plan"
            value={
              <span className="flex items-center gap-1.5 primary-blue-color">
                <Crown className="w-4 h-4" strokeWidth={2} />
                {user.plan === "Free" ? "Free Plan" : `${user.plan} Plan`}
              </span>
            }
            valueClassName="primary-blue-color"
          />
          <InfoRow label="Renewal date" value={user.renewalDate ?? "05-06-2026"} />
          <InfoRow label="Storage" value={user.storage} />
          <InfoRow label="Current Pay" value={user.revenue} />
        </SectionCard>

        <div className="flex flex-col gap-2.5">
          <h3 className="text-[14px] font-normal text-[#2C2C2C] px-1">Recent Activity Timeline</h3>
          <div className="bg-[#ECF1FB] rounded-[28px] p-5">
            <ul className="flex flex-col">
              {(user.activity ?? DEFAULT_ACTIVITY).map((event, index, arr) => {
                const meta = ACTIVITY_ICONS[event.type] ?? ACTIVITY_ICONS.profile_updated;
                const Icon = meta.icon;
                const isLast = index === arr.length - 1;
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

const DEFAULT_ACTIVITY = [
  { type: "profile_updated", label: "Profile information updated", date: "16-05-2026" },
  { type: "plan_upgraded", label: "Plan upgraded to Pro", date: "12-05-2026" },
  { type: "login_detected", label: "Login from new device", date: "04-05-2026" },
  { type: "payment_received", label: "Payment received", date: "01-05-2026" },
];
