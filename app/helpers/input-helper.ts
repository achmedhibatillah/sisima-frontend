type FilterOptions = {
    allow?: string;
    format?: "uppercase" | "lowercase" | "title";
    space?: "single" | "none" | "any";
};

export function filterInput(value: string, options?: FilterOptions): string {
    let val = value;

    if (options?.allow) {
        const regex = new RegExp(`[^${options.allow}]`, "g");
        val = val.replace(regex, "");
    }

    const space = options?.space ?? "single";

    if (space === "none") {
        val = val.replace(/\s+/g, "");
    } else if (space === "single") {
        val = val.replace(/\s{2,}/g, " ");
    }

    if (options?.format === "uppercase") {
        val = val.toUpperCase();
    } else if (options?.format === "lowercase") {
        val = val.toLowerCase();
    } else if (options?.format === "title") {
        val = val
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ");
    }

    return val;
}

type NumberFilterOptions = {
    negative?: boolean
    decimal?: boolean
    scientific?: boolean
}

export function filterNumberInput(value: string, options?: NumberFilterOptions): string {
    let allowed = "0-9"

    if (options?.negative) allowed += "\\-"
    if (options?.decimal) allowed += "\\."
    if (options?.scientific) allowed += "eE"

    const regex = new RegExp(`[^${allowed}]`, "g")
    let val = value.replace(regex, "")

    if (options?.negative) {
        val = val.replace(/(?!^)-/g, "")
    }

    if (options?.decimal) {
        const parts = val.split(".")
        if (parts.length > 2) {
            val = parts[0] + "." + parts.slice(1).join("")
        }
    }

    if (options?.scientific) {
        const parts = val.split(/[eE]/)
        if (parts.length > 2) {
            val = parts[0] + "e" + parts.slice(1).join("")
        }
    }

    return val
}
