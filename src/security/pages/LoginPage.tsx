import useSecurity from "~/security/hooks/useSecurity.tsx";
import {Navigate, useNavigate} from "react-router";

export default function LoginPage() {
    const navigate = useNavigate();
    const {user, login} = useSecurity();

    const handleLogin = (formData: FormData) => {
        const email = formData.get("email") as string
        const pass = formData.get("password") as string

        console.log({email, pass})

        login({username: email, pass: pass}) && navigate("/")
    }

    if (user) {
        return <Navigate to="/" replace/>
    }

    return <>
        <form action={handleLogin} style={{display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "200px"}}>
            <label htmlFor="user_email">Username</label>
            <input id="user_email" type="email" name="email" required/>
            {/*{errors.user && (<span>{errors.user}</span>)}*/}
            <label htmlFor="user_pass">Password</label>
            <input id="user_pass" type="password" name="password" required autoComplete="custom-password"/>
            {/*{errors.pass && (<span>{errors.pass}</span>)}*/}
            <button type="submit">Login</button>
        </form>
    </>
}