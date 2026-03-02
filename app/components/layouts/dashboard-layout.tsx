import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import DashboardSidebar from "./dashboard-sidebar"
import type React from "react"
import { Card, CardContent } from "../ui/card"
import { GraduationCap, Home, UserRound } from "lucide-react"
import type { menuItemsType } from "~/types/layout-type"

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {

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
                    name: "Tambah Data Siswa",
                    url: "/students/add",
                    icon: null,
                    sub: null
                },
            ]
        }
    ]
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "20rem",
                    "--sidebar-width-mobile": "20rem"
                } as React.CSSProperties
            }
        >
            <DashboardSidebar menus={menus} />
            <main className="bg-gray-200 p-2 flex flex-col w-full">
                <Card className="p-2 mb-2 w-full sticky top-2">
                    <CardContent className="px-2">
                        <div className="flex items-center">
                            <SidebarTrigger />
                            <div className="ml-auto flex items-center">
                                <div className="bg-blue-300 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-blue-400"><UserRound className="h-5 text-white" /></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {children}

                <Card className="mt-2 p-3">
                    <CardContent className="px-3 text-gray-400 text-sm font-light text-center">© 2026 SISIMA. All rights reserved.</CardContent>
                </Card>
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout
