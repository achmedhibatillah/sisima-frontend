"use client"

import { Mars, Venus } from "lucide-react"
import { InputDropdown } from "../ui/input-dropdown"

export function GenderInput({
    value,
    onChange,
    onBlur,
    "aria-invalid": ariaInvalid,
}: {
    value?: string
    onChange?: (v: string) => void
    onBlur?: () => void
    "aria-invalid"?: boolean
}) {

    const items = [
        {
            value: "MALE",
            label: (
                <>
                    <Mars className="text-blue-500" /> Laki-laki
                </>
            ),
        },
        {
            value: "FEMALE",
            label: (
                <>
                    <Venus className="text-pink-500" /> Perempuan
                </>
            ),
        },
    ] as const

    return (
        <InputDropdown
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            items={items}
            label="Jenis Kelamin"
            placeholder="Pilih"
            aria-invalid={ariaInvalid}
        />
    )
}

export default GenderInput
