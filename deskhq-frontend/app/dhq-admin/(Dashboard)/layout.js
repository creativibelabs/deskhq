import Header from "@/components/common/Header";
import DHQSidebar from "@/components/dhq-admin/dashboard/Sidebar";

export default function DHQDashboardLayout({ children }) {
  return (
    <div className="dhq-admin min-h-screen bg-[linear-gradient(90deg,#D3E0F7_0%,#FFFFFF_100%)]">
      <div className="flex">
        <DHQSidebar />
        <div className="flex flex-col min-h-screen flex-1 px-5">
          {/* Header */}
          <div className=""><Header /></div>
          <hr className="my-5 text-[#00000014]"/>
          {/* Page Content */}
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}
