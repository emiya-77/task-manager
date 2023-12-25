import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../layouts/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Dashboard from "../layouts/Dashboard/Dashboard";
import UserHome from "../pages/Dashboard/UserPages/Tasks/Tasks";
import PrivateRoute from "./PrivateRoute";
import AddTask from "../pages/Dashboard/UserPages/Add a Task/AddTask";
import MyProfile from "../pages/Dashboard/UserPages/MyProfile/MyProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'tasks',
                element: <PrivateRoute><UserHome></UserHome></PrivateRoute>
            },
            {
                path: 'add-task',
                element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path: 'my-profile',
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            }
        ]
    }
]);


export default router;