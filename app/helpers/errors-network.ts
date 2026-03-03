import type { AxiosError } from "axios"

export function getErrorMessage(error: unknown): string {
    // default message
    let message = "Terjadi kesalahan."

    if (error instanceof Error) {
        message = error.message
    } else if (typeof error === "string") {
        message = error
    } else if (error && typeof error === "object" && "isAxiosError" in error) {
        const axiosError = error as AxiosError

        if (axiosError.response) {
            message = `Error ${axiosError.response.status}: ${(axiosError.response.data as any)?.message || axiosError.response.statusText
                }`
        } else if (axiosError.request) {
            message = "Tidak ada respon dari server. Periksa koneksi jaringan."
        } else if (axiosError.code === "ECONNABORTED") {
            message = "Permintaan ke server timeout."
        } else {
            message = axiosError.message || "Terjadi kesalahan tidak diketahui."
        }
    }

    return message
}
