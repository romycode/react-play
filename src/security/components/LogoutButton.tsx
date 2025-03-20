import useSecurity from "~/security/hooks/useSecurity.tsx";
import {useNavigate} from "react-router";
import Button from "~/shared/components/Button.tsx";

const LogoutButton = () => {
    const navigate = useNavigate();
    const {logout} = useSecurity();

    const handleLogout = () => {
        logout();
        navigate("/login", {replace: true})
            ?.catch(e => console.error(e));
    }

    return <Button variant="contained" onClick={handleLogout}>Logout</Button>
}

export default LogoutButton