import Layout from "../../pages/Layout";
import { lazy } from 'react'

import { routesLinks } from "../sidebarLinks";
const ErrorPage = lazy(() => import("../../pages/errors/ErrorPage"))

export const routes = [
    {
        path: "/", element: <Layout />, errorElement: <ErrorPage />,
        children: routesLinks
    }
]
// console.log(routes)