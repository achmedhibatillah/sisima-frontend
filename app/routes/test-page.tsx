import axios from "axios"
import { useEffect, useState } from "react"
import { appConfig } from "~/config"

const TestPage = () => {

    const [name, setName] = useState<any | null>(null)

    // const payload = {
    //     full_name: "Achmed Hibatillah"
    // }

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.post(`${appConfig.api}/student/exists/name`, {
                full_nam: "Achmed Hibatillah Romadhon Chosa"
            })
            setName(res.data.data)
        }

        fetch()
    }, [])

    return (
        <>{JSON.stringify(name)}</>
    )
}

export default TestPage
