import { ReactNode } from "react";
import { DubWordmark } from "./dub-wordmark";

export default function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <DubWordmark className="h-6" />
          <div role="presentation" className="h-3 w-0.5 bg-foreground/10 hidden sm:block"/>
          <span className="text-foreground/60 font-bold font-display hidden sm:block">Partners Referrals Embed Demo</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="https://dub.co/docs/partners/white-labeling"
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center px-3 h-8 font-medium border text-foreground/80 border-foreground/20 rounded-lg text-sm hover:bg-foreground/[0.02] transition-colors duration-150"
          >
            Read the docs
          </a>

          <a href="https://dub.co/partners"
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center px-3 h-8 font-medium border text-background border-background/20 bg-foreground rounded-lg text-sm hover:bg-foreground/90 transition-colors duration-150"
          >
            Join the beta
          </a>
        </div>
      </div>
      <div className="grow px-2 sm:px-6">
        <div className="bg-foreground/5 border border-foreground/10 size-full rounded-xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}