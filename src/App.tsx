import './App.css'
import {NavLink, Outlet} from "react-router";
import AuthenticateMiddleware from "~/security/components/AuthenticateMiddleware.tsx";
import LogoutButton from "~/security/components/LogoutButton.tsx";

export default function App() {
    return <>
        <AuthenticateMiddleware>
            <header>
                <nav style={{
                    height: "min-content",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <NavLink to='/releases'>Releases</NavLink>
                    <LogoutButton/>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>Footer</footer>
        </AuthenticateMiddleware>
    </>
}
