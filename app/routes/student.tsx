import { useEffect, useState } from "react";
import type { Route } from "./+types/student"
import type { StudentResponseType } from "~/types/response-types"
import axios from "axios";
import DashboardLayout from "~/components/layouts/dashboard-layout";
import { Card } from "~/components/ui/card";
import { appConfig } from "~/config";

const StudentDetail = ({ loaderData, params }: Route.ComponentProps) => {
    const [student, setStudent] = useState<StudentResponseType | null>(null)

    useEffect(() => {
        axios
            // .get('http://127.0.0.1:8888/student/' + params.id)
            .get(`${appConfig.api}/student/${params.id}`)
            .then((res) => {
                setStudent(res.data.data)
            })
    }, [])

    return (
        <DashboardLayout pageNow="Database Siswa">
            <Card>{JSON.stringify(student)}</Card>
        </DashboardLayout>
    );
}

export default StudentDetail
