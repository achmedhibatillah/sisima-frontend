"use client"

import { InputDropdown } from "../ui/input-dropdown"


export function ClassInput({
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
        { value: "N", label: <div className="text-muted-foreground">No data</div> },
        { value: "1", label: <>Kelas 1</> },
        { value: "2", label: <>Kelas 2</> },
        { value: "3", label: <>Kelas 3</> },
        { value: "4", label: <>Kelas 4</> },
        { value: "5", label: <>Kelas 5</> },
        { value: "6", label: <>Kelas 6</> },
        { value: "L", label: <>Lulus</> },
    ] as const

    return (
        <InputDropdown
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            items={items}
            label="Kelas"
            placeholder="Pilih"
            aria-invalid={ariaInvalid}
        />
    )
}

export default ClassInput
