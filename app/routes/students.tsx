import axios from "axios"
import { useEffect, useState } from "react"
import DashboardLayout from "~/components/layouts/dashboard-layout"
import { Card } from "~/components/ui/card"

const Students = () => {
    const [students, setStudents] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8888/student').then(res => {
            setStudents(res.data)
        })
    }, [])

    return (
        <DashboardLayout>
            <Card>
                {JSON.stringify(students)}
            </Card>
        </DashboardLayout>
    )
}

export default Students
