import { ChevronDown, DoorClosed, GraduationCap, Home, Plus } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "../ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Link, useLocation } from "react-router"
import type { ReactNode } from "react"

const DashboardSidebar = () => {
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar
    } = useSidebar()

    const location = useLocation()

    type menuItemsType = {
        name: string,
        icon: ReactNode | null,
        url: string,
        sub: menuItemsType[] | null
    }

    const isParentActive = (menu: menuItemsType) => {
        if (!menu.sub) return false
        return menu.sub.some(
            (sub) => location.pathname === sub.url
        )
    }

    const menus: menuItemsType[] = [
        {
            name: "Dashboard",
            url: "/",
            icon: <Home />,
            sub: null
        },
        {
            name: "Siswa",
            url: "",
            icon: <GraduationCap />,
            sub: [
                {
                    name: "Database Siswa",
                    url: "/students",
                    icon: null,
                    sub: null
                },
                {
                    name: "Tambah Siswa",
                    url: "/students/add",
                    icon: null,
                    sub: null
                },
            ]
        }
    ]

    return (
        <Sidebar variant="floating">

            <SidebarHeader>
                <SidebarMenu>

                    <SidebarMenuItem>
                        <div className="flex items-center gap-3 border-black border-b pb-3">
                            <img src="/logo-blue.png" className="w-15" />
                            <div>
                                <div className="font-bold text-2xl">Sisima</div>
                                <div className="text-xs italic">Sistem Informasi Minhajussalam</div>
                                <div className="text-xs">Bidang Keuangan</div>
                            </div>
                        </div>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {menus.map((menu) => (
                        <SidebarMenuItem key={menu.name}>
                            {menu.sub ? (
                                <Collapsible defaultOpen={isParentActive(menu)}>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton isActive={isParentActive((menu))}
                                            className="data-[active=true]:bg-blue-100 cursor-pointer"
                                        >
                                            {menu.icon ? (
                                                menu.icon
                                            ) : (
                                                <DoorClosed />
                                            )}
                                            <span>{menu.name}</span>
                                            <ChevronDown className="ml-auto" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub className="pe-0 me-0.5">
                                            {menu.sub.map((submenu) => (
                                                <SidebarMenuSubItem key={submenu.name}>
                                                    <SidebarMenuSubButton asChild isActive={location.pathname === submenu.url}
                                                        className="data-[active=true]:font-medium cursor-pointer"
                                                    >
                                                        <Link to={submenu.url}>
                                                            {submenu.icon ? (
                                                                menu.icon
                                                            ) : (
                                                                <DoorClosed />
                                                            )}
                                                            <span>{submenu.name}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </Collapsible>
                            ) : (
                                <SidebarMenuButton asChild isActive={location.pathname === menu.url}>
                                    <Link to={menu.url}>
                                        {menu.icon ? (
                                            menu.icon
                                        ) : (
                                            <DoorClosed />
                                        )}
                                        <span>{menu.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            )}
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    )
}

export default DashboardSidebar
