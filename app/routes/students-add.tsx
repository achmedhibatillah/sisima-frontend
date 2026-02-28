import axios from "axios"
import { useFormik } from "formik"
import * as Yup from "yup"
import DashboardLayout from "~/components/layouts/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

const StudentsAddPage = () => {
    const addStudentRequest = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object(({
            name: Yup.string().required('Nama lengkap wajib diisi.')
        })),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://127.0.0.1:8888/students', values)
            } catch (error: any) {

            }
        }
    })

    return (
        <DashboardLayout>
            <Card>
                <CardHeader>
                    <CardTitle className="text-blue-900">Tambah Data Siswa</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={addStudentRequest.handleSubmit}></form>
                </CardContent>
            </Card>
        </DashboardLayout>
    )
}

export default StudentsAddPage
