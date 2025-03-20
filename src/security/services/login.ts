import {SecurityContextType} from "~/security/contexts/securityContext.tsx";

export function runLogin({username, pass}: Parameters<SecurityContextType['login']>[0]) {
    if (pass === 'test' && username === 'test@test.com') {
        sessionStorage.setItem("user", JSON.stringify({email: username}));
        return true
    }
    return false
}