import {useCallback, useState} from "react"

export const useHTTP = () => {
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(null)

    const request = useCallback(async (url) => {
        setLoading(true)
        try {
            const response = await fetch(url)

            if(!response.ok){
                throw new Error(`Ошибка статус: ${response.status}`)
            }

            const result = await response.json()
            setLoading(false)

            return result
        }catch(e){
            setLoading(false)
            setError(e.message)
            throw e
        }
    } , [])

    const clearError = useCallback(() => {
        setError(null)
    } , [])

    return {loading , error , request , clearError}
}