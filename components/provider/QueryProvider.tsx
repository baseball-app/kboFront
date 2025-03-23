import {keepPreviousData, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {PropsWithChildren} from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      // placeholderData: keepPreviousData,
    },
  },
})

export default function QueryProvider({children}: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
