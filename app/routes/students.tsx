import axios from "axios"
import { ArrowDownAz } from "lucide-react"
import { useEffect, useState } from "react"
import DashboardLayout from "~/components/layouts/dashboard-layout"
import PaginationSection from "~/components/specific/pagination-section"
import PaginationItem from "~/components/specific/pagination-section"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field"
import { InputDropdown } from "~/components/ui/input-dropdown"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import type { MetaPaginationType } from "~/types/meta-type"
import type { StudentResponseType } from "~/types/response-types"

const Students = () => {
    const [students, setStudents] = useState<StudentResponseType[]>([])
    const [meta, setMeta] = useState<MetaPaginationType>()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState('10')
    const [sort, setSort] = useState('full_name')


    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8888/student?page=${page}&limit=${limit}&sort=${sort}`)
            .then((res) => {
                setStudents(res.data.data)
                setMeta(res.data.meta)
            })
    }, [page, limit, sort])

    return (
        <DashboardLayout>
            <Card className="py-8">
                <CardHeader>
                    <CardTitle className="text-gray-500 text-2xl">
                        Database Siswa
                    </CardTitle>
                    <FieldGroup className="grid grid-cols-12 mt-3">
                        <Field className="col-span-6 lg:col-span-3">
                            <FieldLabel className="font-light leading-3.5 ps-1">Urutkan berdasarkan</FieldLabel>
                            <InputDropdown
                                value={sort}
                                onChange={setSort}
                                items={[{ value: 'full_name', label: (<>Nama lengkap</>) }, { value: 'created_at', label: (<>Waktu Dibuat</>) }]}
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
                    </FieldGroup>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>NIS</TableHead>
                                <TableHead>NISN</TableHead>
                                <TableHead>Nama Lengkap</TableHead>
                                <TableHead>Nama Panggilan</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Tahun Masuk</TableHead>
                                <TableHead>Kelas</TableHead>
                                <TableHead>Dibuat</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.nis || "-"}</TableCell>
                                    <TableCell>{student.nisn || "-"}</TableCell>
                                    <TableCell className="font-medium">{student.full_name || "-"}</TableCell>
                                    <TableCell>{student.nick_name || "-"}</TableCell>
                                    <TableCell>{student.gender}</TableCell>
                                    <TableCell>{student.entry_year}</TableCell>
                                    <TableCell>{student.class}</TableCell>
                                    <TableCell>{new Date(student.created_at).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>

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
