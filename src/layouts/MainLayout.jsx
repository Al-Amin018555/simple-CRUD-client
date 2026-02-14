import { Outlet } from "react-router";
import Headers from "../components/Headers";

const MainLayout = () => {
    return (
        <div>
            <Headers></Headers>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;