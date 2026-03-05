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
import { Info, ListChevronsUpDown, NotebookText } from "lucide-react"

type Props = {
    meta?: MetaPaginationType
    currentPage: number
    onChangePage: (page: number) => void
}

type Slot = number | "ellipsis" | null

const PaginationSection = ({ meta, currentPage, onChangePage }: Props) => {
    if (!meta || meta.total_pages <= 1) return null

    const total = meta.total_pages
    let slots: Slot[] = []

    if (total <= 7) {
        slots = Array.from({ length: total }, (_, i) => i + 1)
    } else {
        if (currentPage <= 4) {
            slots = [1, 2, 3, 4, 5, "ellipsis", total]
        } else if (currentPage >= total - 3) {
            slots = [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total]
        } else {
            slots = [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", total]
        }
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

                    return (
                        <PaginationItem key={i}>
                            <PaginationLink
                                className="cursor-pointer w-9 text-center"
                                isActive={slot === currentPage}
                                onClick={() => onChangePage(slot as number)}
                            >
                                {slot}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                <PaginationItem>
                    <PaginationNext
                        className="cursor-pointer"
                        onClick={() => currentPage < total && onChangePage(currentPage + 1)}
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}

type PaginationInfoProps = {
    meta?: MetaPaginationType
    currentPage: number
    limit: number
}

const PaginationInfo = ({ meta, currentPage, limit }: PaginationInfoProps) => {
    if (!meta || meta.total_items === 0) return null

    const start = (currentPage - 1) * limit + 1
    const end = Math.min(currentPage * limit, meta.total_items)
    const totalPages = meta.total_pages

    return (
        <div className="flex flex-col sm:flex-row sm:items-center text-sm justify-between gap-2 text-gray-500">
            <div className="flex items-center gap-2">
                <ListChevronsUpDown className="size-4 w-3" />
                <span className="font-light">Menampilkan <b>{start}-{end}</b> dari <b>{meta.total_items}</b> data.</span>{" "}
            </div>
            <div className="font-light flex items-center gap-1">
                <NotebookText className="size-4 w-3" />
                <span>Halaman <b>{currentPage}</b> dari <b>{totalPages}</b>.</span>
            </div>
        </div>
    )
}

export { PaginationSection, PaginationInfo }
