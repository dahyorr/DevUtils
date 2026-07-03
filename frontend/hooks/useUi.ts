"use client"
import { UiContext } from "@/context/UiContext"
import { useContext } from "react"

export const useUi = () => useContext(UiContext)