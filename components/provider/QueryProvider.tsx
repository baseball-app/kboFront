import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {PropsWithChildren} from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
})

export default function QueryProvider({children}: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
