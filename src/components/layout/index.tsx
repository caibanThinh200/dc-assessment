'use client'
import LoadingOverlay from "../ui/loading-overlay"

interface LayoutProps {
    children: React.ReactNode
}


const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <>
        {children}
        <LoadingOverlay />
    </>
}


export default Layout;