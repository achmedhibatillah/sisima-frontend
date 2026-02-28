import { ChevronDown, DoorClosed } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "../ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Link, useLocation } from "react-router"
import type { menuItemsType } from "../types/layout-type"

const DashboardSidebar = ({ menus }: {
    menus: menuItemsType[]
}) => {
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

    const isParentActive = (menu: menuItemsType) => {
        if (!menu.sub) return false
        return menu.sub.some(
            (sub) => location.pathname === sub.url
        )
    }

    return (
        <Sidebar variant="floating" className="pe-0 bg-gray-200">

            <SidebarHeader className="bg-white rounded-xl">
                <SidebarMenu>

                    <SidebarMenuItem>
                        <div className="p-4 flex items-end gap-2.5">
                            <img src="/logo-blue.png" className="w-13" />
                            <div className="-mb-1">
                                <div className="text-gray-600 font-bold text-3xl -mb-1">sisima</div>
                                <div className="text-gray-400 text-xs">Bagian Keuangan</div>
                            </div>
                        </div>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-white">
                <SidebarMenu className="ps-3">
                    {menus.map((menu) => (
                        <SidebarMenuItem key={menu.name}>
                            {menu.sub ? (
                                <Collapsible defaultOpen={isParentActive(menu)}>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton isActive={isParentActive((menu))}
                                            className="data-[active=true]:bg-blue-50 cursor-pointer py-5 ps-3"
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
                                                        className="
                                                            py-5 ps-3
                                                            cursor-pointer
                                                            rounded-r-none
                                                            relative
                                                            data-[active=true]:bg-blue-100
                                                            data-[active=true]:text-blue-800
                                                            data-[active=true]:font-medium

                                                            data-[active=true]:before:content-['']
                                                            data-[active=true]:before:absolute
                                                            data-[active=true]:before:right-1
                                                            data-[active=true]:before:top-0
                                                            data-[active=true]:before:h-full
                                                            data-[active=true]:before:w-1
                                                            data-[active=true]:before:bg-white

                                                            data-[active=true]:after:content-['']
                                                            data-[active=true]:after:absolute
                                                            data-[active=true]:after:right-0
                                                            data-[active=true]:after:top-0
                                                            data-[active=true]:after:h-full
                                                            data-[active=true]:after:w-1
                                                            data-[active=true]:after:bg-blue-500
                                                        "
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
                                <SidebarMenuButton asChild isActive={location.pathname === menu.url}
                                    className="
                                        py-5 ps-3
                                        rounded-r-none
                                        relative
                                        data-[active=true]:bg-blue-100
                                        data-[active=true]:text-blue-800
                                        data-[active=true]:font-medium

                                        data-[active=true]:before:content-['']
                                        data-[active=true]:before:absolute
                                        data-[active=true]:before:right-1
                                        data-[active=true]:before:top-0
                                        data-[active=true]:before:h-full
                                        data-[active=true]:before:w-1
                                        data-[active=true]:before:bg-white

                                        data-[active=true]:after:content-['']
                                        data-[active=true]:after:absolute
                                        data-[active=true]:after:right-0
                                        data-[active=true]:after:top-0
                                        data-[active=true]:after:h-full
                                        data-[active=true]:after:w-1
                                        data-[active=true]:after:bg-blue-500
                                        ">
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
