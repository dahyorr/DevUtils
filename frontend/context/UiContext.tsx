"use client"
import { createContext, PropsWithChildren, useCallback, useState } from "react";

type UiContextType = {
  sidebarOpen: boolean
  loading: boolean
  headerProgressVisible: boolean
  showLoader: () => void
  hideLoader: () => void
  toggleSidebar: () => void
  openSideBar: () => void
  closeSideBar: () => void
  displayHeaderProgressBar: () => void
  hideHeaderProgressBar: () => void
}

const defaults: UiContextType = {
  loading: false,
  sidebarOpen: false,
  headerProgressVisible: false,
  showLoader: () => {},
  hideLoader: () => {},
  toggleSidebar: () => {},
  openSideBar: () => {},
  closeSideBar: () => {},
  displayHeaderProgressBar: () => {},
  hideHeaderProgressBar: () => {},
}

export const UiContext = createContext<UiContextType>(defaults)

export const UiProvider = ({children}: PropsWithChildren) => {
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [headerProgressVisible, setHeaderProgressVisible] = useState(false)
  
  const showLoader = useCallback(() => {
    setLoading(true)
  }, [])

  const hideLoader = useCallback(() => {
    setLoading(false)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const openSideBar = () => {
    setSidebarOpen(true)
  }

  const closeSideBar = () => {
    setSidebarOpen(false)
  }

  const displayHeaderProgressBar = useCallback(() => {
    setHeaderProgressVisible(true)
  }, [])

  const hideHeaderProgressBar = useCallback(() => {
    setHeaderProgressVisible(false)
  }, []) 

  const value = {
    loading,
    hideLoader,
    showLoader,
    toggleSidebar,
    sidebarOpen,
    openSideBar,
    closeSideBar,
    displayHeaderProgressBar,
    headerProgressVisible,
    hideHeaderProgressBar
  }

  return (
    <UiContext.Provider value={value}>
      {children}
    </UiContext.Provider>
  )
}
