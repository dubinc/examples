import { CircleCheck } from "../icons/nucleo/circle-check"
import { Folder } from "../icons/nucleo/folder"
import { Gift } from "../icons/nucleo/gift"
import { House } from "../icons/nucleo/house"
import { Sliders } from "../icons/nucleo/sliders"
import { AcmeLogo } from "./acme-logo"


const NAV_ITEMS = [
  {
    label: "Home",
    icon: House,
  },
  {
    label: "Projects",
    icon: Folder,
  },
  {
    label: "Tasks",
    icon: CircleCheck
  },
  {
    label: "Settings",
    icon: Sliders,
  },
  {
    label: "Referrals",
    icon: Gift,
    active: true
  }
]

export function SideNav() {
  return (
    <div className="hidden md:block w-fit" role="presentation">
      <AcmeLogo className="mt-6 size-11" />
      <div className="flex flex-col gap-2 py-6 cursor-default">
        {NAV_ITEMS.map(({label, icon: Icon, active}) => (
          <div
            key={label}
            className={[
              "flex items-center gap-1.5 h-7 px-2.5 rounded-lg",
              active ? "bg-blue-300/15 border border-blue-500/20 text-blue-600" : "text-foreground"
            ].join(" ")}
          >
            <Icon className="size-4" />
            <span className="font-medium text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}