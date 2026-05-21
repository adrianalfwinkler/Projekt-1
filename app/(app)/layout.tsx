import { Navbar } from "@/components/landing/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="pt-16">{children}</main>
    </div>
  );
}
