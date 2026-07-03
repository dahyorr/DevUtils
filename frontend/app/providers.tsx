"use client"
import MainSpinner from '@/components/loaders/MainSpinner'
import { UiProvider } from '@/context/UiContext'
import { SnackbarProvider, SnackbarProviderProps } from 'notistack'
import React, { PropsWithChildren } from 'react'

// notistack@3.0.2's SnackbarProvider is a class component whose shipped types
// predate React 19's stricter class-component JSX checking; this cast is
// type-only and can be removed once notistack ships React 19-compatible types.
const TypedSnackbarProvider = SnackbarProvider as unknown as React.ComponentType<PropsWithChildren<SnackbarProviderProps>>

const Providers = ({children}: PropsWithChildren) => {
  return (
    <UiProvider>
      <TypedSnackbarProvider maxSnack={3}>
        {children}
        <MainSpinner />
      </TypedSnackbarProvider>
    </UiProvider>
  )
}

export default Providers