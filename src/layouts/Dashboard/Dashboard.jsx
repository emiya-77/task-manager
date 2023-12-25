import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "../../components/Footer";


const Dashboard = () => {
    return (
        <div>
            <div className="flex h-screen bg-blue-50">
                <div>
                    <Sidebar></Sidebar>
                </div>
                <div className="flex-1 lg:px-16 px-2 py-12 ml-14 lg:ml-64">
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>

    );
};

export default Dashboard;