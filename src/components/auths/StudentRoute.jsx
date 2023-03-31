import { Navigate } from "react-router-dom";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

const StudentRoute = ({ children }) => {
    const isLoggedIn = useIsLoggedIn();

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default StudentRoute;
