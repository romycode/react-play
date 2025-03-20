import {createContext} from "react"

export type SecurityContextType = {
    user: { email: string, roles: string[], permissions: string[] } | null;
    login: (credentials: { username: string; pass: string }) => boolean;
    logout: () => void;
}

const SecurityContext = createContext<SecurityContextType>({} as SecurityContextType)

export default SecurityContext