import type { Metadata } from "next";
import "./admin.css";
import AdminSidebar from "@/components/admin/Sidebar";

export const metadata: Metadata = {
  title: "CONFAD Admin Panel",
  description: "Pannello di amministrazione CONFAD",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">{children}</main>
    </div>
  );
}
