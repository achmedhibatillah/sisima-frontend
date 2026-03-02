import axios from "axios"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import DashboardLayout from "~/components/layouts/dashboard-layout"
import GenderView from "~/components/specific/gender-view"
import PaginationSection from "~/components/specific/pagination-section"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { InputDropdown } from "~/components/ui/input-dropdown"
import { Skeleton } from "~/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { showRelativeDateTime } from "~/helpers/date-helper"
import highlightKeyword from "~/helpers/highlight-text"
import { cn } from "~/lib/utils"
import type { MetaPaginationType } from "~/types/meta-type"
import type { StudentResponseType } from "~/types/response-types"

const Students = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [students, setStudents] = useState<StudentResponseType[]>([])
    const [meta, setMeta] = useState<MetaPaginationType>()

    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("page") ?? 1)
    const limit = searchParams.get("limit") ?? "10"
    const sort = searchParams.get("sort") ?? "full_name"
    const genderFilter = searchParams.get("gender") ?? ""
    const classFilter = searchParams.get("class") ?? ""
    const keyword = searchParams.get("k") ?? ""

    const updateParams = (params: Record<string, string | undefined>) => {
        const merged = {
            page: page.toString(),
            limit,
            sort,
            gender: genderFilter,
            class: classFilter,
            k: keyword,
            ...params,
        }

        const filtered = Object.fromEntries(
            Object.entries(merged).filter(([_, v]) => v !== undefined && v !== "")
        )

        setSearchParams(filtered)
    }

    const setPage = (p: number) => updateParams({ page: p.toString() })
    const setLimit = (l: string) => updateParams({ page: "1", limit: l })
    const setSort = (s: string) => updateParams({ page: "1", sort: s })
    const setGender = (g: string) => updateParams({ page: "1", gender: g })
    const setClass = (c: string) => updateParams({ page: "1", class: c })
    const setKeyword = (k: string) => updateParams({ page: "1", k })

    useEffect(() => {
        setLoading(true);

        const params: Record<string, string> = {
            page: page.toString(),
            limit,
            sort,
            gender: genderFilter,
            class: classFilter,
        }
        if (keyword) params.k = keyword

        const queryString = new URLSearchParams(params).toString()

        axios
            .get(`http://127.0.0.1:8888/student?${queryString}`, { timeout: 5000 })
            .then((res) => {
                setStudents(res.data.data)
                setMeta(res.data.meta)
            })
            .catch(() => {
                setError("Gagal memuat data siswa")
            })
            .finally(() => setLoading(false))
    }, [page, limit, sort, genderFilter, classFilter, keyword])

    const [searchFocus, setSearchFocus] = useState(false)

    return (
        <DashboardLayout>
            <Card className="py-8">
                <CardHeader>
                    <CardTitle className="text-gray-500 text-2xl">
                        Database Siswa
                    </CardTitle>
                    <FieldGroup className="grid grid-cols-12 my-5 mb-4">
                        <Field className="col-span-12">
                            <div className="flex items-center gap-3">
                                <Search className={cn(searchFocus ? 'text-gray-400' : 'text-gray-300', 'size-8')} />
                                <Input
                                    onFocus={() => setSearchFocus(true)}
                                    onBlur={() => setSearchFocus(false)}
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="Cari berdasarkan nama, NIS, atau NISN..."
                                />
                            </div>
                        </Field>
                        <Field className="col-span-6 lg:col-span-3">
                            <FieldLabel className="font-light leading-3.5 ps-1">Urutkan berdasarkan</FieldLabel>
                            <InputDropdown
                                value={sort}
                                onChange={setSort}
                                items={[{ value: 'full_name', label: (<>Nama lengkap</>) }, { value: 'created_at', label: (<>Waktu dibuat</>) }, { value: 'updated_at', label: (<>Waktu diubah</>) }]}
                                size="sm"
                                showChevronInButton={true}
                            />
                        </Field>
                        <Field className="col-span-6 lg:col-span-3">
                            <FieldLabel className="font-light leading-3.5 ps-1">Data per halaman</FieldLabel>
                            <InputDropdown
                                value={limit}
                                onChange={setLimit}
                                items={[{ value: '10', label: (<>10 baris</>) }, { value: '25', label: (<>25 baris</>) }, { value: '50', label: (<>50 baris</>) }, { value: '100', label: (<>100 baris</>) }, { value: '200', label: (<>200 baris</>) }]}
                                size="sm"
                                showChevronInButton={true}
                            />
                        </Field>
                        <Field className="col-span-6 lg:col-span-3">
                            <FieldLabel className="font-light leading-3.5 ps-1">Kelas</FieldLabel>
                            <InputDropdown
                                value={classFilter}
                                onChange={setClass}
                                items={[{ value: "", label: <>Semua</> }, { value: "N", label: <>No data (N)</> }, { value: "1", label: <>Kelas 1</> }, { value: "2", label: <>Kelas 2</> }, { value: "3", label: <>Kelas 3</> }, { value: "4", label: <>Kelas 4</> }, { value: "5", label: <>Kelas 5</> }, { value: "6", label: <>Kelas 6</> }, { value: "L", label: <>Lulus (L)</> }]}
                                size="sm"
                                showChevronInButton={true}
                            />
                        </Field>
                        <Field className="col-span-6 lg:col-span-3">
                            <FieldLabel className="font-light leading-3.5 ps-1">Jenis kelamin</FieldLabel>
                            <InputDropdown
                                value={genderFilter}
                                onChange={setGender}
                                items={[
                                    { value: '', label: <>Semua</> },
                                    { value: 'male', label: <>Laki-laki</> },
                                    { value: 'female', label: <>Perempuan</> }
                                ]}
                                size="sm"
                                showChevronInButton={true}
                            />
                        </Field>
                    </FieldGroup>
                </CardHeader>

                <CardContent>

                    {error ? (
                        <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
                            <p>Gagal memuat data.</p>
                            <Button
                                variant="outline"
                                onClick={() => setPage(page)}
                            >
                                Coba lagi
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-blue-100 hover:bg-blue-100">
                                    <TableHead className="text-muted-foreground text-end">#</TableHead>
                                    <TableHead>NIS</TableHead>
                                    <TableHead>NISN</TableHead>
                                    <TableHead>Nama Lengkap</TableHead>
                                    <TableHead>Jenis Kelamin</TableHead>
                                    <TableHead>Kelas</TableHead>
                                    <TableHead>Dibuat</TableHead>
                                    <TableHead>Diubah</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading
                                    ? Array.from({ length: Number(limit) }).map((_, i) => (
                                        <TableRow key={i}>
                                            {[...Array(7)].map((_, i) => (
                                                <TableCell key={i}>
                                                    <Skeleton className="h-5 w-5/6" />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                    : students.map((student, index) => (
                                        <TableRow key={student.id}
                                            className={cn(index % 2 !== 0 && "bg-muted", "cursor-pointer hover:bg-gray-200")}
                                            onClick={() => window.location.href = '/students/' + student.id}
                                        >
                                            <TableCell className="text-end">{(page - 1) * Number(limit) + index + 1}</TableCell>
                                            <TableCell>{highlightKeyword(student.nis || "-", keyword)}</TableCell>
                                            <TableCell>{highlightKeyword(student.nisn || "-", keyword)}</TableCell>
                                            <TableCell className="font-medium">{highlightKeyword(student.full_name || "-", keyword)}</TableCell>
                                            <TableCell><GenderView gender={student.gender} /></TableCell>
                                            <TableCell>{student.class}</TableCell>
                                            <TableCell>{showRelativeDateTime(student.created_at)}</TableCell>
                                            <TableCell>{showRelativeDateTime(student.updated_at)}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    )}

                    <div className="mt-10">
                        <PaginationSection
                            meta={meta}
                            currentPage={page}
                            onChangePage={(p) => setPage(p)}
                        />
                    </div>
                </CardContent>

            </Card>
        </DashboardLayout>
    )
}

export default Students
