import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/auth/authSelectors";
import { userLoggedOut } from "../../features/auth/authSlice";
import learningportalSVG from "./../../assets/image/learningportal.svg";
import LogoutIcon from "../icons/LogoutIcon";

const StudentNavbar = () => {
    const dispatch = useDispatch();
    const { name, role } = selectUser();

    const handleLogout = () => dispatch(userLoggedOut());

    return (
        <nav className="shadow-md">
            <div className="mx-auto flex max-w-7xl justify-between px-5 py-3 lg:px-0">
                <Link to="/">
                    <img className="h-10" src={learningportalSVG} />
                </Link>
                <div className="flex items-center gap-3">
                    <Link to="/leaderboard">Leaderboard</Link>
                    {role === "admin" && <Link to="/admin">Admin</Link>}
                    <h2 className="font-bold">{name}</h2>
                    <button
                        onClick={handleLogout}
                        className="border-cyan hover:bg-cyan flex items-center gap-2 rounded-full border px-4 py-1 text-sm transition-all "
                    >
                        <LogoutIcon />
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default StudentNavbar;
