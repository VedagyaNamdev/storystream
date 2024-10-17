import { ClerkProvider } from '@clerk/nextjs'
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'

function Provider({children}) {
  return (
    <ClerkProvider>
    <NextUIProvider>
      {children}
    </NextUIProvider>
    </ClerkProvider>
  )
}

export default Provider