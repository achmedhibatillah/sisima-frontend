"use client"

import * as React from "react"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
} from "../ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

type DropdownItem<T extends string> = {
    value: T
    label: React.ReactNode
}

type DropdownSize = "sm" | "md"

interface InputDropdownProps<T extends string> {
    value?: T
    onChange?: (value: T) => void
    onBlur?: () => void
    items: readonly DropdownItem<T>[]
    placeholder?: string
    label?: string
    contentWidth?: string
    size?: DropdownSize
    showChevronInButton?: boolean
    "aria-invalid"?: boolean
}

export function InputDropdown<T extends string>({
    value,
    onChange,
    onBlur,
    items,
    placeholder = "Pilih",
    label,
    contentWidth = "w-50",
    size = "md",
    showChevronInButton = false,
    "aria-invalid": ariaInvalid,
}: InputDropdownProps<T>) {

    const selected = items.find((i) => i.value === value)

    const buttonSize =
        size === "sm" ? "p-2" : "p-6"

    const itemPadding =
        size === "sm" ? "py-2" : "py-2"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    aria-invalid={ariaInvalid}
                    className={`
                        cursor-pointer
                        ${buttonSize}
                        aria-invalid:border-red-500
                        aria-invalid:ring-red-500
                    `}
                    onBlur={onBlur}
                >
                    {selected ? (
                        <div className="font-normal flex items-center w-full gap-2">
                            {selected.label} <ChevronDown className="ms-auto" />
                        </div>
                    ) : (
                        <div className="font-light flex items-center w-full gap-2">
                            {placeholder} <ChevronDown className="ms-auto" />
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className={contentWidth} align="start">
                <DropdownMenuGroup>

                    {label && (
                        <DropdownMenuLabel className={itemPadding}>
                            {label}
                        </DropdownMenuLabel>
                    )}

                    <DropdownMenuRadioGroup
                        value={value}
                        onValueChange={(v) => onChange?.(v as T)}
                    >
                        {items.map((item) => (
                            <DropdownMenuRadioItem
                                key={item.value}
                                value={item.value}
                                className={`cursor-pointer ${itemPadding}`}
                            >
                                {item.label}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>

                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
