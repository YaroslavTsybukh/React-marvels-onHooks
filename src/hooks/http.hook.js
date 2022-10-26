import {useCallback, useState} from "react"

export const useHTTP = () => {
    const [process , setProcess] = useState("waiting")

    const request = useCallback(async (url) => {
        setProcess("loading")
        try {
            const response = await fetch(url)

            if(!response.ok){
                throw new Error(`Ошибка статус: ${response.status}`)
            }

            const result = await response.json()

            return result
        }catch(e){
            setProcess("error")
            throw e
        }
    } , [])

    const clearError = useCallback(() => {
        setProcess("loading")
    } , [])

    return {request , clearError , process , setProcess}
}