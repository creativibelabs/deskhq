"use client";

import { useState } from "react";
import DHQBreadCrumb from "@/components/dhq-admin/dashboard/BreadCrumb";
import CustomSelect from "@/components/common/CustomSelect";
import OrgStatsCards from "@/components/dhq-admin/dashboard/organizations/StatsCards";
import OrganizationsToolbar from "@/components/dhq-admin/dashboard/organizations/OrganizationsToolbar";
import OrganizationsTable from "@/components/dhq-admin/dashboard/organizations/OrganizationsTable";
import TablePagination from "@/components/dhq-admin/dashboard/organizations/TablePagination";
import OrganizationViewPanel from "@/components/dhq-admin/organizations/OrganizationViewPanel";

const filterOptions = [
  { value: "last_week", label: "Last Week" },
  { value: "last_30_days", label: "Last 30 Days" },
  { value: "last_year", label: "Last Year" },
];

const ACTIVITY_TEMPLATE = [
  { type: "manager_added", label: "New manager added", date: "16-05-2026" },
  { type: "subscription_upgraded", label: "Subscription upgraded to Premium", date: "12-05-2026" },
  { type: "user_suspended", label: "User account suspended", date: "04-05-2026" },
  { type: "payment_received", label: "Payment received", date: "01-05-2026" },
];

function toOrganizationDetail(org) {
  return {
    id: org.id,
    ownerName: org.name,
    ownerEmail: org.email,
    avatarColor: org.avatarColor,
    lastSeenAt: "Last seen Monday, 12 June 2026, 10:25am",
    domain: org.email.split("@")[1] ?? org.email,
    createdDate: org.createdDate,
    usersCount: org.users * 5,
    clientsCount: org.clients * 5,
    plan: org.plan === "Free" ? "Free Plan" : `${org.plan} Plan`,
    renewalDate: "05-06-2026",
    usage: org.storage,
    currentPay: org.revenue,
    activity: ACTIVITY_TEMPLATE,
  };
}

export default function OrganizationsContent() {
  const [period, setPeriod] = useState("last_30_days");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(4);
  const [selectedOrg, setSelectedOrg] = useState(null);

  return (
    <>
      <div className="topBar flex items-center justify-between mb-6">
        <DHQBreadCrumb />
        <CustomSelect options={filterOptions} value={period} onChange={setPeriod} />
      </div>

      <div className="content flex flex-col gap-6">
        <OrgStatsCards />

        <div className="flex flex-col gap-5">
          <OrganizationsToolbar
            search={search}
            onSearchChange={setSearch}
            onFilter={() => {}}
            onExport={() => {}}
            onAddOrganization={() => {}}
          />

          <OrganizationsTable onView={(org) => setSelectedOrg(toOrganizationDetail(org))} />

          <TablePagination currentPage={page} totalPages={9} onPageChange={setPage} />
        </div>
      </div>

      <OrganizationViewPanel
        organization={selectedOrg}
        onClose={() => setSelectedOrg(null)}
        onEdit={() => {}}
        onSuspend={() => {}}
      />
    </>
  );
}
