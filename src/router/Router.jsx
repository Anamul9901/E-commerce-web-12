import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../page/ErrorPage/ErrorPage";
import Home from "../page/Home/Home/Home";
import Login from "../page/Login/Login";
import SignUp from "../page/Home/SignUp/SignUp";
import CreateShope from "../page/CreateShope/CreateShope";
import PrivetRoute from "./PrivetRoute"
import Dashboard from "../Layout/Dashboard";
import MyProducts from "../page/Dashboard/MyProducts/MyProducts";
import AddProducts from "../page/Dashboard/AddProducts/AddProducts";
import UpdateProduct from "../page/Dashboard/UpdateProduct/UpdateProduct";
import ManageShope from "../page/Dashboard/ManageShope/ManageShope";
import AllUsre from "../page/Dashboard/AllUser/AllUsre";
import Subscription from "../page/Dashboard/Subscription/Subscription";
import Payment from "../page/Dashboard/Payment/Payment";
import AdminRoute from "./AdminRoute";
import ModaratorRoute from "./ModaratorRoute";
import SalesProduct from "../page/Dashboard/SalesProduct/SalesProduct";
import HomeDashboard from "../page/Dashboard/HomeDashboard/HomeDashboard";
import UserPayment from "../page/UserPayment/UserPayment";
import SalesCount from "../page/Dashboard/SalesCount/SalesCount";
import SaleSactionAdmin from "../page/Dashboard/SaleSectionAdmin/SaleSactionAdmin";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/create-store',
                element: <PrivetRoute><CreateShope /></PrivetRoute>
            },
            {
                path: '/user-payment',
                element: <UserPayment />
            }

        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoute><Dashboard /></PrivetRoute>,
        children: [
            {
                path: '/dashboard',
                element: <HomeDashboard />
            },

            {
                path: 'my-product',
                element: <ModaratorRoute><MyProducts /></ModaratorRoute>
            },
            {
                path: 'addproduct',
                element: <ModaratorRoute><AddProducts /></ModaratorRoute>
            },
            {
                path: 'updateProduct/:id',
                element: <ModaratorRoute><UpdateProduct /></ModaratorRoute>,
                loader: ({ params }) => fetch(`https://assignment-12-server-eta-inky.vercel.app/products/${params.id}`)
            },
            {
                path: 'subscription',
                element: <ModaratorRoute><Subscription /></ModaratorRoute>
            },
            {
                path: 'payment',
                element: <Payment />,

            },
            {
                path: 'sales-product',
                element: <ModaratorRoute><SalesProduct /></ModaratorRoute>
            },
            {
                path: 'sales-count',
                element: <ModaratorRoute><SalesCount /></ModaratorRoute>
            },

            //Admin route
            {
                path: 'manage-shop',
                element: <AdminRoute><ManageShope /> </AdminRoute>
            },
            {
                path: 'manage-user',
                element: <AdminRoute><AllUsre /></AdminRoute>
            },
            {
                path: 'sales-sectin',
                element: <AdminRoute><SaleSactionAdmin /></AdminRoute>
            }
        ]
    }
]);
export default router;