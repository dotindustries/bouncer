import * as React from 'react'
import { AuthProvider } from '../auth/AuthProvider'

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <AuthProvider>{children}</AuthProvider>
}
