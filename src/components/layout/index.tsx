'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import LoadingOverlay from "../ui/loading-overlay"

interface LayoutProps {
    children: React.ReactNode
}

const queryClient = new QueryClient()

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
        <LoadingOverlay />
    </>
}


export default Layout;