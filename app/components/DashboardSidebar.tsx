"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { authClient, useSession } from "@/lib/auth-client"
import {
  LayoutDashboard,
  Search,
  Bookmark,
  ClipboardList,
  CreditCard,
  Settings,
  Building2,
  Briefcase,
  PlusCircle,
  Users,
  DollarSign,
  LogOut,
  Home,
  Building,
  Tag,
  LucideIcon,
} from "lucide-react"

// ──────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────
type Role = "seeker" | "recruiter" | "admin"

type MenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

type MenuItemsByRole = Record<Role, MenuItem[]>

// ──────────────────────────────────────────────────────────
// Figma + Requirements based menu definitions
// ──────────────────────────────────────────────────────────
// Seeker: Seeker Home (stats, chart), Browse & Apply (/jobs), Saved (/saved),
// My Applications (/applications), Billing (/billing), Settings (/settings)
//
// Recruiter: Recruiter Home, My Company (/company), Manage Jobs (/jobs),
// Post a Job (/jobs/new), View Applicants (/applicants), Billing, Settings
//
// Admin: Admin Home, Manage Users (/users), Companies (/companies),
// Jobs (/jobs), Payments (/payments), Settings
//
// Each object matches the commented template:
// { id, name, url, icon } → <item.icon /> <span>{item.name}</span>
// ──────────────────────────────────────────────────────────
const menuItemsByRole: MenuItemsByRole = {
  seeker: [
    {
      id: "seeker-dashboard",
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      id: "seeker-jobs",
      name: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: Search,
    },
    {
      id: "seeker-saved",
      name: "Save Jobs",
      url: "/dashboard/seeker/saved",
      icon: Bookmark,
    },
    {
      id: "seeker-applications",
      name: "Application",
      url: "/dashboard/seeker/applications",
      icon: ClipboardList,
    },
    {
      id: "seeker-billing",
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCard,
    },
    {
      id: "seeker-setting",
      name: "Setting",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],
  recruiter: [
    {
      id: "recruiter-dashboard",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      id: "recruiter-jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
      id: "recruiter-add-jobs",
      name: "Add Jobs",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      id: "recruiter-applications",
      name: "Application",
      url: "/dashboard/recruiter/applicants",
      icon: ClipboardList,
    },
    {
      id: "recruiter-setting",
      name: "Setting",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      id: "admin-dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "admin-users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "admin-companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      id: "admin-jobs",
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: Briefcase,
    },
    {
      id: "admin-payments",
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: DollarSign,
    },
    {
      id: "admin-setting",
      name: "Setting",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

// Public navigation shown below role navigation (Fig requirement)
const publicNav: MenuItem[] = [
  { id: "public-home", name: "Home", url: "/", icon: Home },
  { id: "public-jobs", name: "Browse Jobs", url: "/browse-jobs", icon: Search },
  { id: "public-companies", name: "Companies", url: "/company", icon: Building },
  { id: "public-pricing", name: "Pricing", url: "/pricing", icon: Tag },
]

export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const rawRole = (session?.user as { role?: string } | undefined)?.role || "seeker"
  const role: Role = (["seeker", "recruiter", "admin"] as const).includes(rawRole as Role)
    ? (rawRole as Role)
    : "seeker"

  const items = menuItemsByRole[role]
  const user = session?.user

  async function handleLogout() {
    await authClient.signOut()
    router.push("/")
  }

  return (
    <Sidebar className="border-white/[0.06] bg-[#151516]">
      {/* Header: logo + user */}
      <SidebarHeader className="gap-0 p-0">
        <div className="flex h-16 items-center border-b border-white/[0.06] px-4">
          <Link href="/" className="font-display text-[20px] font-extrabold tracking-tight">
            <span className="text-[#6B7BFF]">hire</span>
            <span className="text-[#FF8A2E]">loop</span>
          </Link>
        </div>
        {user && (
          <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-4">
            <div className="flex size-9 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white">
              {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-white/50">{user.email}</p>
              <span className="mt-1 inline-flex rounded-full bg-[#5C53FE]/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#A9A5FF]">
                {role}
              </span>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        {/* Role based */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/30">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url || pathname?.startsWith(item.url + "/")
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={<Link href={item.url} />}
                      className="data-[active=true]:bg-white/[0.08] data-[active=true]:text-white"
                    >
                      <item.icon />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-white/[0.06]" />

        {/* Public */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/30">Public</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {publicNav.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton render={<Link href={item.url} />}>
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
{/* Footer Section */}
      <SidebarFooter className="border-t border-white/[0.06] p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export { menuItemsByRole }
export type { MenuItem, Role, MenuItemsByRole }