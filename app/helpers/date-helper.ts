export function showDateTimeHelper(datetimeInput: string) {
    const datetime = new Date(datetimeInput)

    const day = datetime.getDate()
    const month = datetime.getMonth()
    const year = datetime.getFullYear()

    const hour = datetime.getHours().toString().padStart(2, "0")
    const minute = datetime.getMinutes().toString().padStart(2, "0")
    const second = datetime.getSeconds().toString().padStart(2, "0")

    const months = [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ]

    return `${day} ${months[month]} ${year} ${hour}:${minute}:${second}`
}

export function showRelativeDateTime(datetimeInput: string) {
    const date = new Date(datetimeInput)
    const now = new Date()

    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diff < 60) {
        return `${diff} detik lalu`
    }

    const minutes = Math.floor(diff / 60)
    if (minutes < 60) {
        return `${minutes} menit lalu`
    }

    const hours = Math.floor(minutes / 60)
    if (hours < 24) {
        return `${hours} jam lalu`
    }

    const days = Math.floor(hours / 24)

    if (days === 1) {
        return "kemarin"
    }

    if (days < 7) {
        return `${days} hari lalu`
    }

    const months = [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ]

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
}
