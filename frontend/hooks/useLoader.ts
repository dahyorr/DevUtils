"use client"
import { useUi } from "./useUi"

export const useLoader = () => {
    const { showLoader, hideLoader, loading } = useUi()
    return { showLoader, hideLoader, loading }
}