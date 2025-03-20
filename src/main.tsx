import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import './index.css'
import {RouterProvider} from "react-router/dom";
import SecurityProvider from "~/security/components/SecurityProvider.tsx";
import {createBrowserRouter} from "react-router";
import LoginPage from "~/security/pages/LoginPage.tsx";
import App from "~/App.tsx";
import DashboardPage from "~/welcome/pages/DashboardPage.tsx";
import ReleasesPage from "~/releases/pages/ReleasesPage.tsx";
import ReleasePage from "~/releases/pages/ReleasePage.tsx";
import NewReleasePage from "~/releases/pages/NewReleasePage.tsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <DashboardPage/>,
                handle: {
                    permissions: ['dashboard']
                }
            },
            {
                path: "releases",
                children: [
                    {
                        index: true,
                        element: <ReleasesPage/>,
                    },
                    {
                        path: ":id",
                        children: [
                            {
                                index: true,
                                element: <ReleasePage/>,
                            },
                            {
                                path: "new",
                                element: <NewReleasePage/>,
                            }
                        ],
                    },
                ]
            }
        ],
    },
])

createRoot(document.getElementById('root')!)
    .render(
        <StrictMode>
            <SecurityProvider>
                <RouterProvider router={router} key="app-router"/>
            </SecurityProvider>
        </StrictMode>,
    )
