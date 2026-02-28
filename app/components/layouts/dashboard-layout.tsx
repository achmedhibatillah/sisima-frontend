import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import DashboardSidebar from "./dashboard-sidebar"
import type React from "react"

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "20rem",
                    "--sidebar-width-mobile": "20rem"
                } as React.CSSProperties
            }
        >
            <DashboardSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout
