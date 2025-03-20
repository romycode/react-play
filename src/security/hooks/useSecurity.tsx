import {use} from "react";
import SecurityContext, {SecurityContextType} from "~/security/contexts/securityContext.tsx";

export default function useSecurity(): SecurityContextType {
    return use(SecurityContext)
}