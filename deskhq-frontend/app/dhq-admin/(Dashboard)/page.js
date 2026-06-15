"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  UserCog,
  Crown,
  Database,
  Settings,
  TriangleAlert,
  TrendingUp,
} from "lucide-react";
import DHQBreadCrumb from "@/components/dhq-admin/dashboard/BreadCrumb";
import CustomSelect from "@/components/common/CustomSelect";
import StatCard from "@/components/dhq-admin/dashboard/StatCard";
import PerformanceChart from "@/components/dhq-admin/dashboard/PerformanceChart";
import CoreModules from "@/components/dhq-admin/dashboard/CoreModules";
import ChatsWidget from "@/components/dhq-admin/dashboard/ChatsWidget";
import { RecentActivityList, RecentActivityEmpty } from "@/components/dhq-admin/dashboard/RecentActivity";

const filterOptions = [
  { value: "last_week", label: "Last Week" },
  { value: "last_30_days", label: "Last 30 Days" },
  { value: "last_year", label: "Last Year" },
];

const STATS = [
  { icon: Building2, iconBg: "#3B7FF7", trend: "up", trendLabel: "2% Increase", label: "Total Organizations", value: "100" },
  { icon: Users, iconBg: "#3B7FF7", trend: "down", trendLabel: "10% Decrease", label: "Total Users", value: "95" },
  { icon: UserCog, iconBg: "#3B7FF7", trend: "down", trendLabel: "10% Decrease", label: "Total Managers", value: "95" },
  { icon: Crown, iconBg: "#3B7FF7", trend: "down", trendLabel: "10% Decrease", label: "Active Subscriptions", value: "220" },
  { icon: Database, iconBg: "#3B7FF7", trend: "down", trendLabel: "10% Decrease", label: "Storage Used", value: "200GB", suffix: "/100TB" },
  { icon: Settings, iconBg: "#3B7FF7", trend: "down", trendLabel: "10% Decrease", label: "System Health", value: "95%", suffix: "/Healthy" },
  { icon: TriangleAlert, iconBg: "#3B7FF7", trend: "down", trendLabel: "10% Decrease", label: "Alerts", value: "3" },
  { icon: TrendingUp, iconBg: "#0CCC67", trend: "up", trendLabel: "10% Increase", label: "Monthly Revenue", value: "$5,300" },
];

export default function DHQDashboard() {
  const [filter, setFilter] = useState("last_30_days");

  return (
    <>
      <div className="topBar flex items-center justify-between mb-6">
        <DHQBreadCrumb />
        <CustomSelect options={filterOptions} value={filter} onChange={setFilter} />
      </div>

      <div className="content flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="flex flex-col xl:flex-row gap-6 items-stretch">
          <PerformanceChart />
          <CoreModules />
        </div>

        <div className="flex flex-col xl:flex-row gap-6 items-stretch">
          <ChatsWidget />
          <RecentActivityList />
        </div>

        <RecentActivityEmpty />
      </div>
    </>
  );
}
