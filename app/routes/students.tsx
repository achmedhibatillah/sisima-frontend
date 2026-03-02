import axios from "axios"
import { useEffect, useState } from "react"
import DashboardLayout from "~/components/layouts/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import type { MetaPaginationType } from "~/types/meta-type"
import type { StudentResponseType } from "~/types/response-types"

const Students = () => {
    const [students, setStudents] = useState<StudentResponseType[]>([])
    const [meta, setMeta] = useState<MetaPaginationType>()

    useEffect(() => {
        axios.get('http://127.0.0.1:8888/student')
            .then((res) => {
                setStudents(res.data.data)
                setMeta(res.data.meta)
            })
    }, [])

    return (
        <DashboardLayout>
            <Card className="py-8">
                <CardHeader>
                    <CardTitle className="text-gray-500 text-2xl">
                        Database Siswa
                    </CardTitle>
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

                            {students.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center text-gray-500">
                                        Tidak ada data siswa
                                    </TableCell>
                                </TableRow>
                            )}

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

                    {JSON.stringify(meta)}
                </CardContent>

            </Card>
        </DashboardLayout>
    )
}

export default Students
