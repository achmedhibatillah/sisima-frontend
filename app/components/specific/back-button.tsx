import { ArrowLeft } from "lucide-react"
import { cn } from "~/lib/utils"

interface BackButtonProps {
    className?: string
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
    return (
        <button
            onClick={() => window.history.back()}
            className={cn(
                className,
                "flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            )}
        >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
        </button>
    )
}

export default BackButton
