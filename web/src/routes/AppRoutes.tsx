import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Layout } from "../components/ui/LayoutHeader";
import { BerandaPage } from "../pages/view/BerandaPage";
import { Error404 } from "../components/ui/Error404";
import { ClinicDetail } from "../components/beranda/ClinicDetail";
import { LayananPage } from "../pages/view/LayananPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/beranda" replace />,
            },
            {
                path: "/beranda",
                element: <BerandaPage />,
                children: [
                    {
                        path: "clinics/:id",
                        element: < ClinicDetail />,
                    },
                ]
            },
            {
                path: "/layanan",
                element: <LayananPage />,
            },
            {
                path: "*",
                element: <Error404 />,
            },
        ],
    },
]);

export const AppRoutes = () => <RouterProvider router={router} />;