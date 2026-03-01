import type { ReactNode } from "react"

export type menuItemsType = {
    name: string,
    icon: ReactNode | null,
    url: string,
    sub: menuItemsType[] | null
}

