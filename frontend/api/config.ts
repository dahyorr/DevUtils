import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_BASE_URL
export const serviceApi = axios.create({
    baseURL: `${HOST}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const routes = {
    upload: '/upload',
    initiateHash: '/hash/initiate',
    getHashResult: '/hash/result', // query parameter fileId
}

export const uploadFile = async (file: File, isTemp?: boolean) => {
    const formData = new FormData()
    formData.append('file', file)
    if (isTemp) {
        formData.append('isTemp', 'yes')
    }
    const { data, status, statusText } = await serviceApi.post<{
        fileId: string;
        message: string;
    }>(routes.upload, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return { data, status, statusText }
}