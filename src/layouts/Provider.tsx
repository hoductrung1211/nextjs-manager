import { AlertProvider } from "@/hooks/useAlert"
import { AuthProvider } from "@/hooks/useAuth"

export default function Provider({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <AuthProvider>
        <AlertProvider>
          {children}
        </AlertProvider>
        </AuthProvider>
    )
}