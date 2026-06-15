"use client";

import { useState } from "react";
import DHQBreadCrumb from "@/components/dhq-admin/dashboard/BreadCrumb";
import CustomSelect from "@/components/common/CustomSelect";
import UsersStatsCards from "@/components/dhq-admin/organizations/users/UsersStatsCards";
import UsersToolbar from "@/components/dhq-admin/organizations/users/UsersToolbar";
import UsersTable from "@/components/dhq-admin/organizations/users/UsersTable";
import TablePagination from "@/components/dhq-admin/dashboard/organizations/TablePagination";
import UserViewPanel from "@/components/dhq-admin/organizations/users/UserViewPanel";

const filterOptions = [
  { value: "last_week", label: "Last Week" },
  { value: "last_30_days", label: "Last 30 Days" },
  { value: "last_year", label: "Last Year" },
];

const ACTIVITY_TEMPLATE = [
  { type: "profile_updated", label: "Profile information updated", date: "16-05-2026" },
  { type: "plan_upgraded", label: "Plan upgraded to Pro", date: "12-05-2026" },
  { type: "login_detected", label: "Login from new device", date: "04-05-2026" },
  { type: "payment_received", label: "Payment received", date: "01-05-2026" },
];

function toUserDetail(user) {
  return {
    ...user,
    lastSeenAt: "Last seen Monday, 12 June 2026, 10:25am",
    renewalDate: "05-06-2026",
    activity: ACTIVITY_TEMPLATE,
  };
}

export default function UsersContent() {
  const [period, setPeriod] = useState("last_30_days");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(4);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <div className="topBar flex items-center justify-between mb-6">
        <DHQBreadCrumb />
        <CustomSelect options={filterOptions} value={period} onChange={setPeriod} />
      </div>

      <div className="content flex flex-col gap-6">
        <UsersStatsCards />

        <div className="flex flex-col gap-5">
          <UsersToolbar
            search={search}
            onSearchChange={setSearch}
            onFilter={() => {}}
            onExport={() => {}}
            onAddUser={() => {}}
          />

          <UsersTable onView={(user) => setSelectedUser(toUserDetail(user))} />

          <TablePagination currentPage={page} totalPages={9} onPageChange={setPage} />
        </div>
      </div>

      <UserViewPanel
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onEdit={() => {}}
        onSuspend={() => {}}
      />
    </>
  );
}
