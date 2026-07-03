import { HashRequest, HashData } from "@/types"
import { serviceApi, routes } from "./config"

export const initiateHashing = async (requestData: HashRequest) => {
    const {data, status, statusText} = await serviceApi.post<{message: string}>(
        routes.initiateHash,
        requestData
    )
    return {data, status, statusText}
}

export const getHashingResult = async (fileId: string) => {
    const {data, status, statusText} = await serviceApi.get<HashData[]>(
        routes.getHashResult,
        {
            params: {
                fileId
            }
        }
    )
    return {data, status, statusText}
}