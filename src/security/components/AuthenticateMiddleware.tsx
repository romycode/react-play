import useSecurity from "~/security/hooks/useSecurity.tsx";
import {Navigate} from "react-router";
import {ReactNode} from "react";

export default function AuthenticateMiddleware({children}: { children: ReactNode }) {
    const {user} = useSecurity()

    if (!user?.email) {
        return <Navigate to="/login" replace></Navigate>
    }

    return <>{children}</>
}