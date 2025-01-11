import { SaleForm } from "./sale-form";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-display text-xl font-bold">Dashboard</h1>
      <h2 className="mt-8 text-base font-medium">Create a sale</h2>
      <SaleForm />
    </div>
  );
}
