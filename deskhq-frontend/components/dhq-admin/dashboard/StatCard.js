import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";

const TREND_STYLES = {
  up: "bg-[#0CCC6733] text-[#0CCC67]",
  down: "bg-[#F11D1D33] text-[#F11D1D]",
};

export default function StatCard({ icon: Icon, iconBg = "#3B7FF7", trend = "up", trendLabel, label, value, suffix }) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;

  return (
    <Link
      href="#"
      className="bg-[#FFFFFF66] border-white border shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-4xl p-4.5 hover:scale-102 transition-transform duration-200"
    >
      <div className="flex items-start justify-between">
        <span
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="w-6 h-6 text-white" strokeWidth={2} />
        </span>

        {trendLabel && (
          <span className={`rounded-[22px] py-1 px-2.5 flex items-center gap-1 text-[10px] font-normal ${TREND_STYLES[trend]}`}>
            <TrendIcon className="w-3.5 h-3.5" strokeWidth={2} />
            {trendLabel}
          </span>
        )}
      </div>

      <p className="text-[14px] grey-color font-normal mt-5 mb-2">{label}</p>
      <span className="primary-blue-color text-[28px] font-medium">
        {value}
        {suffix && <span className="font-medium text-[14px] grey-color">{suffix}</span>}
      </span>
    </Link>
  );
}
