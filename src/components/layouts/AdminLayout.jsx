import { Link } from "react-router-dom";
import learningportalSVG from "./../../assets/image/learningportal.svg";

const AdminLayout = ({ children }) => {
    return (
        <>
            <nav className="shadow-md">
                <div className="mx-auto flex max-w-7xl justify-between px-5 py-3 lg:px-0">
                    <img className="h-10" src={learningportalSVG} />
                    <div className="flex items-center gap-3">
                        <Link to="/admin" className="font-bold">
                            Admin
                        </Link>
                        <button className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-1 text-sm font-medium transition-all hover:bg-red-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            {children}
        </>
    );
};

export default AdminLayout;
