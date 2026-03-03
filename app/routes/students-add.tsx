import axios from "axios"
import { useFormik } from "formik"
import { ChevronDown, Mars, SaveAll, Venus } from "lucide-react"
import { useState } from "react"
import * as Yup from "yup"
import DashboardLayout from "~/components/layouts/dashboard-layout"
import ClassInput from "~/components/specific/class-input"
import GenderInput from "~/components/specific/gender-input"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { appConfig } from "~/config"
import { filterInput, filterNumberInput } from "~/helpers/input-helper"

const StudentsAddPage = () => {
    const addStudentRequest = useFormik({
        initialValues: {
            full_name: '',
            nick_name: '',
            gender: '',
            nis: '',
            nisn: '',
            class: '',
            entry_year: ''
        },
        validationSchema: Yup.object(({
            full_name: Yup.string()
                .required('Nama lengkap wajib diisi.')
                .min(3, 'Minimal 3 karakter')
                .max(70, 'Maksimal 70 karakter.'),
            nick_name: Yup.string()
                .min(3, 'Minimal 3 karakter')
                .max(20, 'Maksimal 20 karakter.'),
            gender: Yup.string()
                .required('Jenis kelamin wajib diisi.'),
            nis: Yup.string()
                .max(20, 'Maksimal 20 angka.'),
            nisn: Yup.string()
                .max(20, 'Maksimal 20 angka.'),
            class: Yup.string()
                .required('Kelas wajib diisi.'),
            entry_year: Yup.string()
                .length(4, 'Tahun masuk tidak valid.')
        })),
        onSubmit: async (values) => {
            try {

                const payload = { ...values }

                const response = await axios.post(`${appConfig.api}/student`, payload)

                console.log(response.data)

            } catch (error: any) {

                if (error.response?.data?.title === "VALIDATION_ERROR") {

                    const backendErrors = error.response.data.errors

                    Object.keys(backendErrors).forEach((key) => {
                        addStudentRequest.setFieldError(
                            key,
                            backendErrors[key]
                        )
                    })

                } else {
                    console.error(error)
                }

            }
        }
    })

    return (
        <DashboardLayout pageNow="Tambah Data Siswa">
            <Card className="py-8">
                <CardHeader>
                    <CardTitle className="text-gray-500 text-2xl">Tambah Data Siswa</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={addStudentRequest.handleSubmit}>
                        <FieldSet>

                            <FieldGroup>
                                <Field className="mb-3">
                                    <FieldLabel>Nama lengkap <span className="text-destructive">*</span></FieldLabel>
                                    <Input
                                        id="full_name"
                                        autoComplete="off"
                                        placeholder="Fulan bin Fulan"
                                        value={addStudentRequest.values.full_name}
                                        onBlur={addStudentRequest.handleBlur}
                                        onChange={(e) => {
                                            const val = filterInput(e.target.value, {
                                                allow: "a-zA-Z\\s\\'",
                                                format: "title"
                                            })
                                            addStudentRequest.setFieldValue('full_name', val)
                                        }}
                                        aria-invalid={addStudentRequest.touched.full_name && !!addStudentRequest.errors.full_name}
                                    />
                                    {addStudentRequest.touched.full_name && addStudentRequest.errors.full_name && (
                                        <FieldError>{addStudentRequest.errors.full_name}</FieldError>
                                    )}
                                </Field>
                                <FieldGroup className="grid grid-cols-12">
                                    <Field className="mb-3 col-span-12 lg:col-span-8 lg:me-2">
                                        <FieldLabel>Nama panggilan</FieldLabel>
                                        <Input
                                            id="nick_name"
                                            autoComplete="off"
                                            placeholder="Fulan"
                                            value={addStudentRequest.values.nick_name}
                                            onBlur={addStudentRequest.handleBlur}
                                            onChange={(e) => {
                                                const val = filterInput(e.target.value, {
                                                    allow: "a-zA-Z\\s\\'",
                                                    format: "title"
                                                })
                                                addStudentRequest.setFieldValue('nick_name', val)
                                            }}
                                            aria-invalid={addStudentRequest.touched.nick_name && !!addStudentRequest.errors.nick_name}
                                        />
                                        {addStudentRequest.touched.nick_name && addStudentRequest.errors.nick_name && (
                                            <FieldError>{addStudentRequest.errors.nick_name}</FieldError>
                                        )}
                                    </Field>

                                    <Field className="mb-3 col-span-12 lg:col-span-4">
                                        <FieldLabel>Jenis kelamin <span className="text-destructive">*</span></FieldLabel>
                                        <GenderInput
                                            value={addStudentRequest.values.gender as "male" | "female" | ""}
                                            onChange={(value) => addStudentRequest.setFieldValue("gender", value)}
                                            onBlur={() => addStudentRequest.setFieldTouched("gender", true)}
                                            aria-invalid={addStudentRequest.touched.gender && !!addStudentRequest.errors.gender}
                                        />
                                        {addStudentRequest.touched.gender && addStudentRequest.errors.gender && (
                                            <FieldError>{addStudentRequest.errors.gender}</FieldError>
                                        )}
                                    </Field>
                                </FieldGroup>

                                <Field className="mb-3">
                                    <FieldLabel>Nomor Induk Sekolah</FieldLabel>
                                    <Input
                                        id="nis"
                                        inputMode="numeric"
                                        autoComplete="off"
                                        placeholder="123456789"
                                        value={addStudentRequest.values.nis}
                                        onBlur={addStudentRequest.handleBlur}
                                        onChange={(e) => {
                                            const val = filterNumberInput(e.target.value, {
                                                negative: false,
                                                decimal: false,
                                                scientific: false
                                            })
                                            addStudentRequest.setFieldValue('nis', val)
                                        }}
                                        aria-invalid={addStudentRequest.touched.nis && !!addStudentRequest.errors.nis}
                                    />
                                    {addStudentRequest.touched.nis && addStudentRequest.errors.nis && (
                                        <FieldError>{addStudentRequest.errors.nis}</FieldError>
                                    )}
                                </Field>

                                <Field className="mb-3">
                                    <FieldLabel>Nomor Induk Sekolah Nasional</FieldLabel>
                                    <Input
                                        id="nisn"
                                        inputMode="numeric"
                                        autoComplete="off"
                                        placeholder="123456789"
                                        value={addStudentRequest.values.nisn}
                                        onBlur={addStudentRequest.handleBlur}
                                        onChange={(e) => {
                                            const val = filterNumberInput(e.target.value, {
                                                negative: false,
                                                decimal: false,
                                                scientific: false
                                            })
                                            addStudentRequest.setFieldValue('nisn', val)
                                        }}
                                        aria-invalid={addStudentRequest.touched.nisn && !!addStudentRequest.errors.nisn}
                                    />
                                    {addStudentRequest.touched.nisn && addStudentRequest.errors.nisn && (
                                        <FieldError>{addStudentRequest.errors.nisn}</FieldError>
                                    )}
                                </Field>

                                <FieldGroup className="mb-3 grid grid-cols-12">
                                    <Field className="col-span-6">
                                        <FieldLabel>Kelas <span className="text-destructive">*</span></FieldLabel>
                                        <ClassInput
                                            value={addStudentRequest.values.class}
                                            onChange={(value) => addStudentRequest.setFieldValue("class", value)}
                                            onBlur={() => addStudentRequest.setFieldTouched("class", true)}
                                            aria-invalid={addStudentRequest.touched.class && !!addStudentRequest.errors.class}
                                        />
                                        {addStudentRequest.touched.class && addStudentRequest.errors.class && (
                                            <FieldError>{addStudentRequest.errors.class}</FieldError>
                                        )}
                                    </Field>
                                    <Field className="col-span-6">
                                        <FieldLabel>Tahun masuk</FieldLabel>
                                        <Input
                                            id="entry_year"
                                            inputMode="numeric"
                                            autoComplete="off"
                                            placeholder="2000"
                                            value={addStudentRequest.values.entry_year}
                                            onBlur={addStudentRequest.handleBlur}
                                            onChange={(e) => {
                                                const val = filterNumberInput(e.target.value, {
                                                    negative: false,
                                                    decimal: false,
                                                    scientific: false
                                                })
                                                addStudentRequest.setFieldValue('entry_year', val)
                                            }}
                                            aria-invalid={addStudentRequest.touched.entry_year && !!addStudentRequest.errors.entry_year}
                                        />
                                        {addStudentRequest.touched.entry_year && addStudentRequest.errors.entry_year && (
                                            <FieldError>{addStudentRequest.errors.entry_year}</FieldError>
                                        )}
                                    </Field>
                                </FieldGroup>

                            </FieldGroup>

                            <FieldGroup className="inline">
                                {/* <Button type="submit" variant="appPrimary" disabled={!(addStudentRequest.dirty && addStudentRequest.isValid)}>Simpan <SaveAll /></Button> */}
                                <Button type="submit" variant="appPrimary" >Simpan <SaveAll /></Button>
                            </FieldGroup>

                        </FieldSet>
                    </form>
                </CardContent>
            </Card>
        </DashboardLayout>
    )
}

export default StudentsAddPage
