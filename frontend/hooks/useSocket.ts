"use client"
import { useMemo, useState, useEffect, useCallback } from "react"
import { socketManager } from 'helpers/index'

export const useSocket = (namespace = '') => {
    const [socketInUse, setSocketInUse] = useState(false)
    const socket = useMemo(() => socketManager.socket(namespace), [namespace])

    useEffect(() => {
        // manage connection instance
        if (socketInUse) {
            socket.connect()
        }
        else {
            socket.disconnect()
        }

        return () => {
            socket.disconnect()
        }
    }, [socket, socketInUse])

    const openSocket = useCallback(() => setSocketInUse(true), [])
    const closeSocket = useCallback(() => setSocketInUse(false), [])


    return { socket, openSocket, closeSocket }
}