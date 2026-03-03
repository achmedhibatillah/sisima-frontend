import React from "react"

const highlightKeyword = (text: string, keyword: string): string | React.ReactNode[] => {
    if (!keyword) return text

    const regex = new RegExp(`(${keyword})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
        regex.test(part) ? (
            <span key={index} className="bg-yellow-200">{part}</span>
        ) : (
            <React.Fragment key={index}>{part}</React.Fragment>
        )
    )
}

export default highlightKeyword
