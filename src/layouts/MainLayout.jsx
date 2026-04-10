import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import "../styles/global.css"

function MainLayout() {
    return(
        <>
        <div className="app-layout">
            <Navbar/>
            <main className="main-content">
                <Outlet/>
            </main>
        </div>
        </>
    )
}

export default MainLayout;