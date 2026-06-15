import { ChevronRight, Wallet, Building2, UserPlus, SearchX } from "lucide-react";

const PILL_STYLES = {
  green: "text-[#0CCC67] bg-[#0CCC6733]",
  blue: "text-[#3B7FF7] bg-[#3B7FF733]",
};

const ICON_STYLES = {
  green: "bg-[#0CCC67]",
  blue: "bg-[#3B7FF7]",
};

const ACTIVITY = [
  { id: 1, name: "Creativelabs", date: "May 25, 2023", tag: "Purchased Plan", color: "green", icon: Wallet },
  { id: 2, name: "Datascale AI app", date: "Jun 20, 2023", tag: "New Organization", color: "blue", icon: Building2 },
  { id: 3, name: "Nelsa web developement", date: "May 25, 2023", tag: "Purchased Plan", color: "green", icon: Wallet },
  { id: 4, name: "Datascale AI app", date: "Jun 20, 2023", tag: "New User", color: "blue", icon: UserPlus },
];

function CardHeader() {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-[18px] font-medium text-[#2C2C2C]">Recent Activity</h2>
      <button type="button" className="flex items-center gap-1 text-[14px] font-normal text-[#2C2C2C] cursor-pointer">
        View All
        <ChevronRight className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>
  );
}

export function RecentActivityList() {
  return (
    <div className="bg-white rounded-[32px] p-5 sm:p-6 flex-1">
      <CardHeader />

      <ul className="flex flex-col">
        {ACTIVITY.map((activity, index) => {
          const Icon = activity.icon;
          const isLast = index === ACTIVITY.length - 1;
          return (
            <li key={activity.id} className="flex items-start gap-3">
              <span className="flex flex-col items-center">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${ICON_STYLES[activity.color]}`}>
                  <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                </span>
                {!isLast && <span className="w-px flex-1 min-h-[28px]" style={{ backgroundColor: activity.color === "green" ? "#0CCC67" : "#3B7FF7" }} />}
              </span>
              <div className="flex items-center justify-between gap-3 flex-1 pb-6 pt-0.5 flex-wrap">
                <span className="text-[14px] font-normal text-[#2C2C2C]">{activity.name}</span>
                <span className="text-[14px] font-normal text-[#2C2C2C]">{activity.date}</span>
                <span className={`inline-flex items-center justify-center rounded-[20px] py-1.5 px-3.5 text-[12px] font-normal ${PILL_STYLES[activity.color]}`}>
                  {activity.tag}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function RecentActivityEmpty() {
  return (
    <div className="bg-white rounded-[32px] p-5 sm:p-6 flex-1 flex flex-col">
      <CardHeader />

      <div className="flex-1 flex flex-col items-center justify-center gap-3 py-6">
        <span className="w-[88px] h-[88px] rounded-full bg-[#ECF1FB] flex items-center justify-center">
          <SearchX className="w-10 h-10 primary-blue-color" strokeWidth={1.5} />
        </span>
        <p className="text-[14px] font-normal grey-color">No recent activity to show</p>
      </div>
    </div>
  );
}
