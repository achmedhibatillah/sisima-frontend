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

interface InputDropdownProps<T extends string> {
    value?: T
    onChange?: (value: T) => void
    items: readonly DropdownItem<T>[]
    placeholder?: string
    label?: string
    "aria-invalid"?: boolean
    onBlur?: () => void
}

export function InputDropdown<T extends string>({
    value,
    onChange,
    items,
    placeholder = "Pilih",
    label,
    "aria-invalid": ariaInvalid,
    onBlur
}: InputDropdownProps<T>) {

    const selected = items.find((i) => i.value === value)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    aria-invalid={ariaInvalid}
                    className="
                        cursor-pointer p-6
                        aria-invalid:border-red-500
                        aria-invalid:ring-red-500
                    "
                    onBlur={onBlur}
                >
                    {selected ? (
                        selected.label
                    ) : (
                        <div className="font-light flex items-center gap-2">
                            {placeholder} <ChevronDown />
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-50">
                <DropdownMenuGroup>
                    {label && (
                        <DropdownMenuLabel className="py-3">
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
                                className="cursor-pointer py-3"
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
