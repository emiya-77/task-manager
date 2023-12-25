import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


const Root = () => {
    const location = useLocation();

    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');
    return (
        <div className="container mx-auto flex flex-col justify-between min-h-screen">
            <div>
                {noHeaderFooter || <Navbar></Navbar>}
                <Outlet></Outlet>
            </div>
            <div>
                {noHeaderFooter || <Footer></Footer>}
            </div>
        </div>
    )
}

export default Root