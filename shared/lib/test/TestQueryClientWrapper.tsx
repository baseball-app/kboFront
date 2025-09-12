import React from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const TestQueryClientWrapper = ({children}: {children: React.ReactNode}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {retry: false},
      mutations: {retry: false},
    },
  })

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export {TestQueryClientWrapper}
