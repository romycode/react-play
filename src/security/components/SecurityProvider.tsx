import {ReactNode, useMemo, useState} from "react";
import SecurityContext, {SecurityContextType} from "~/security/contexts/securityContext.tsx";
import {runLogin} from "~/security/services/login.ts";

export default function SecurityProvider({children}: { children: ReactNode }) {
    const cache = sessionStorage.getItem("user")

    const [user, setUser] = useState<SecurityContextType['user']>(
        null !== cache ? JSON.parse(cache) as SecurityContextType['user'] : null
    );

    const contextValue = useMemo(
        () => {
            const login: SecurityContextType['login'] = (credentials) => {
                if (runLogin(credentials)) {
                    setUser({
                        email: credentials.username,
                        roles: ["admin", "user"],
                        permissions: ["list_releases", "detailed_release"]
                    });
                    return true
                }
                return false
            }

            const logout: SecurityContextType['logout'] = () => {
                sessionStorage.removeItem("user");
                setUser(null);
            }

            return {user, login, logout}
        },
        [user],
    )

    return <SecurityContext value={contextValue}>
        {children}
    </SecurityContext>
}