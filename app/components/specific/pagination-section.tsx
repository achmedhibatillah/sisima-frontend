import type { MetaPaginationType } from "~/types/meta-type"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination"

type Props = {
    meta?: MetaPaginationType
    currentPage: number
    onChangePage: (page: number) => void
}

type Slot = number | "ellipsis" | null

const PaginationSection = ({
    meta,
    currentPage,
    onChangePage,
}: Props) => {
    if (!meta || meta.total_pages <= 1) return null

    const total = meta.total_pages

    const slots: Slot[] = [null, null, null, null, null, null, null]

    if (currentPage <= 3) {
        slots[0] = 1
        slots[1] = 2
        slots[2] = 3
        slots[3] = 4
        slots[4] = "ellipsis"
        slots[5] = total
    }

    else if (currentPage >= total - 2) {
        slots[0] = 1
        slots[1] = "ellipsis"
        slots[2] = total - 3
        slots[3] = total - 2
        slots[4] = total - 1
        slots[5] = total
    }

    else {
        slots[0] = 1
        slots[1] = "ellipsis"
        slots[2] = currentPage - 1
        slots[3] = currentPage
        slots[4] = currentPage + 1
        slots[5] = "ellipsis"
        slots[6] = total
    }

    return (
        <Pagination>
            <PaginationContent className="flex gap-1">

                <PaginationItem>
                    <PaginationPrevious
                        className="cursor-pointer"
                        onClick={() => currentPage > 1 && onChangePage(currentPage - 1)}
                    />
                </PaginationItem>

                {slots.map((slot, i) => {
                    if (slot === "ellipsis") {
                        return (
                            <PaginationItem key={i}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                    }

                    if (slot === null) {
                        return <PaginationItem key={i} className="w-9" />
                    }

                    return (
                        <PaginationItem key={i}>
                            <PaginationLink
                                className="cursor-pointer w-9 text-center"
                                isActive={slot === currentPage}
                                onClick={() => onChangePage(slot)}
                            >
                                {slot}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                <PaginationItem>
                    <PaginationNext
                        className="cursor-pointer"
                        onClick={() =>
                            currentPage < total && onChangePage(currentPage + 1)
                        }
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}

export default PaginationSection
