import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { Plus } from "lucide-react"


//role base  menu items

const menuItemsByRole = {
  seeker: [

  ],
  recruiter: [

  ],
  admin: [

  ]
}
export function DashboardSidebar() {
  const { data: session, isPending } = useSession();
  const role = session?.user?.role || 'seeker'; // Default to 'seeker' if role is undefined
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />  
            <SidebarMenu>
            {
            // menuItemsByRole[role].map((item) => (
            //   <SidebarMenuItem key={item.id}>
            //     <SidebarMenuButton render={<a href={item.url} />}>
            //       <item.icon />
            //       <span>{item.name}</span>
            //     </SidebarMenuButton>
            //   </SidebarMenuItem>
            // ))
            }
          </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}