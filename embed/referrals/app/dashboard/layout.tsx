import { ReactNode } from "react";

export default function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <div className="grow px-2 sm:px-6 pb-2 sm:pb-6">
      <div className="bg-foreground/5 border border-foreground/10 size-full rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  )
}