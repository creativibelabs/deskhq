import { Users, User, Database, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  {
    icon: Users,
    iconBg: "#3B7FF7",
    label: "Active Users",
    value: "100",
    trend: "up",
    trendLabel: "2% increase from last month",
  },
  {
    icon: User,
    iconBg: "#3B7FF7",
    label: "Trial users",
    value: "95",
    trend: "down",
    trendLabel: "10% decrease from last month",
  },
  {
    icon: Database,
    iconBg: "#3B7FF7",
    label: "Storage Usage",
    value: "10TB",
    suffix: "/100TB",
    trend: "up",
    trendLabel: "8% increase from last month",
  },
  {
    icon: DollarSign,
    iconBg: "#0CCC67",
    label: "Monthly Revenue",
    value: "$5,300",
    trend: "up",
    trendLabel: "12% increase from last month",
  },
];

export default function UsersStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ icon: Icon, iconBg, label, value, suffix, trend, trendLabel }) => (
        <div
          key={label}
          className="bg-[#FFFFFF66] border-white border shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-4xl p-4.5 flex flex-col gap-5"
        >
          <span
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: iconBg }}
          >
            <Icon className="w-6 h-6 text-white" strokeWidth={2} />
          </span>

          <div className="flex flex-col gap-2">
            <p className="text-[14px] grey-color font-normal">{label}</p>
            <span className="text-[#2C2C2C] text-[28px] font-normal">
              {value}
              {suffix && (
                <span className="font-normal text-[14px] grey-color">{suffix}</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-normal grey-color">
            {trend === "up" ? (
              <TrendingUp className="w-3.5 h-3.5 text-[#0CCC67]" strokeWidth={2} />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-[#F11D1D]" strokeWidth={2} />
            )}
            <span>{trendLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
