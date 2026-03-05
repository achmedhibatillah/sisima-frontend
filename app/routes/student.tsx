import { useEffect, useState } from "react";
import type { Route } from "./+types/student"
import type { StudentResponseType } from "~/types/response-types"
import axios from "axios";
import {
    User,
    GraduationCap,
    CalendarDays,
    BookOpen,
    Clock,
    Shield,
    UserCheck,
    ArrowLeft,
    Contact
} from "lucide-react";
import DashboardLayout from "~/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { appConfig } from "~/config";
import { showDateTimeHelper } from "~/helpers/date-helper";
import BackButton from "~/components/specific/back-button";

const StudentDetail = ({ loaderData, params }: Route.ComponentProps) => {
    const [student, setStudent] = useState<StudentResponseType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios
            .get(`${appConfig.api}/student/${params.id}`)
            .then((res) => {
                setStudent(res.data.data)
            })
            .catch((error) => {
                console.error("Failed to fetch student:", error)
            })
            .finally(() => setLoading(false))
    }, [])

    const getGenderLabel = (gender: string) => {
        return gender === 'MALE' ? 'Laki-laki' : 'Perempuan'
    }

    const getGenderColor = (gender: string) => {
        return gender === 'MALE'
            ? 'bg-blue-100 text-blue-700 border-blue-200'
            : 'bg-pink-100 text-pink-700 border-pink-200'
    }

    const getGenderIcon = (gender: string) => {
        return gender === 'MALE' ? 'MALE' : 'FEMALE'
    }

    const getClassLabel = (cls: string) => {
        const classMap: Record<string, string> = {
            '1': 'Kelas 1',
            '2': 'Kelas 2',
            '3': 'Kelas 3',
            '4': 'Kelas 4',
            '5': 'Kelas 5',
            '6': 'Kelas 6',
            'N': 'No Data',
            'L': 'Lulus'
        }
        return classMap[cls] || cls
    }

    const InfoItem = ({
        icon: Icon,
        label,
        value,
        highlight = false,
        badge = false,
        badgeClass = ""
    }: {
        icon: any,
        label: string,
        value: string | React.ReactNode,
        highlight?: boolean,
        badge?: boolean,
        badgeClass?: string
    }) => (
        <div className={`flex items-start gap-3 p-3 rounded-lg ${highlight ? 'bg-blue-50' : 'hover:bg-gray-50'} transition-colors`}>
            <div className={`p-2 rounded-lg ${highlight ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <Icon className={`w-5 h-5 ${highlight ? 'text-blue-600' : 'text-gray-500'}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 font-medium">{label}</p>
                {badge ? (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${badgeClass}`}>
                        {value}
                    </span>
                ) : (
                    <p className={`text-base font-semibold truncate ${highlight ? 'text-blue-900' : 'text-gray-900'}`}>
                        {value || '-'}
                    </p>
                )}
            </div>
        </div>
    )

    return (
        <DashboardLayout pageNow="Database Siswa">
            <div className="">
                <BackButton className="mt-2 mb-3" />

                <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0 shadow-lg mb-2">
                    <CardContent className="p-6">
                        {loading ? (
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full bg-white/20 animate-pulse"></div>
                                <div className="space-y-2">
                                    <div className="h-8 w-48 bg-white/20 rounded animate-pulse"></div>
                                    <div className="h-4 w-32 bg-white/20 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ) : student ? (
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-4 border-white/30">
                                    <User className="w-12 h-12 text-white/80" />
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold mb-1">{student.full_name}</h1>
                                    <div className="flex flex-wrap gap-3 text-blue-100">
                                        <span className="flex items-center gap-1">
                                            <Shield className="w-4 h-4" />
                                            NIS: {student.nis || '-'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Contact className="w-4 h-4" />
                                            NISN: {student.nisn || '-'}
                                        </span>
                                    </div>
                                </div>
                                <div className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${student.class === 'L'
                                    ? 'bg-green-500/20 border-green-400 text-green-100'
                                    : student.class === 'N'
                                        ? 'bg-gray-500/20 border-gray-400 text-gray-100'
                                        : 'bg-white/20 border-white/30 text-white'
                                    }`}>
                                    {getClassLabel(student.class)}
                                </div>
                            </div>
                        ) : (
                            <p className="text-blue-100">Data tidak ditemukan</p>
                        )}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {/* Personal Information */}
                    <Card className="shadow-md border-gray-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b pb-4">
                            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-600" />
                                Informasi Pribadi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            {loading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                                    ))}
                                </div>
                            ) : student ? (
                                <div className="space-y-1">
                                    <InfoItem
                                        icon={User}
                                        label="Nama Lengkap"
                                        value={student.full_name}
                                        highlight
                                    />
                                    <InfoItem
                                        icon={UserCheck}
                                        label="Nama Panggilan"
                                        value={student.nick_name || '-'}
                                    />
                                    <InfoItem
                                        icon={student.gender === 'MALE' ? 'M' as any : 'F' as any}
                                        label="Jenis Kelamin"
                                        value={getGenderLabel(student.gender)}
                                        badge
                                        badgeClass={getGenderColor(student.gender)}
                                    />
                                </div>
                            ) : null}
                        </CardContent>
                    </Card>

                    <Card className="shadow-md border-gray-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b pb-4">
                            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-blue-600" />
                                Informasi Akademik
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            {loading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                                    ))}
                                </div>
                            ) : student ? (
                                <div className="space-y-1">
                                    <InfoItem
                                        icon={Shield}
                                        label="NIS"
                                        value={student.nis || '-'}
                                    />
                                    <InfoItem
                                        icon={Contact}
                                        label="NISN"
                                        value={student.nisn || '-'}
                                    />
                                    <InfoItem
                                        icon={BookOpen}
                                        label="Kelas"
                                        value={getClassLabel(student.class)}
                                        highlight
                                    />
                                    <InfoItem
                                        icon={CalendarDays}
                                        label="Tahun Masuk"
                                        value={student.entry_year || '-'}
                                    />
                                </div>
                            ) : null}
                        </CardContent>
                    </Card>

                    <Card className="shadow-md border-gray-200 hover:shadow-lg transition-shadow lg:col-span-2">
                        <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b pb-4">
                            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                Informasi Rekaman
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[1, 2].map(i => (
                                        <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                                    ))}
                                </div>
                            ) : student ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <InfoItem
                                        icon={Clock}
                                        label="Dibuat pada"
                                        value={showDateTimeHelper(student.created_at)}
                                    />
                                    <InfoItem
                                        icon={Clock}
                                        label="Diubah pada"
                                        value={showDateTimeHelper(student.updated_at)}
                                    />
                                </div>
                            ) : null}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default StudentDetail
