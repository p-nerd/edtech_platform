import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";
import learningportalSVG from "./../../assets/image/learningportal.svg";
import LogoutIcon from "../icons/LogoutIcon";

const AdminNavbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => dispatch(userLoggedOut());

    return (
        <nav className="shadow-md">
            <div className="mx-auto flex max-w-7xl justify-between px-5 py-3 lg:px-0">
                <Link to="/">
                    <img className="h-10" src={learningportalSVG} />
                </Link>
                <div className="flex items-center gap-3">
                    <Link to="/admin" className="font-bold">
                        Admin
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-1 text-sm font-medium transition-all hover:bg-red-700"
                    >
                        <LogoutIcon />
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
