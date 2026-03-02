import { Mars, Venus } from "lucide-react"

const GenderView = ({ gender }: { gender: 'MALE' | 'FEMALE' | string }) => {
    return (
        <span>
            {gender == 'MALE' ? (
                <span className="flex items-center">
                    <Mars className="text-blue-500 h-4" /> Laki-laki
                </span>

            ) : (
                <span className="flex items-center">
                    <Venus className="text-pink-500 h-4" /> Perempuan
                </span>
            )}
        </span>
    )
}

export default GenderView
