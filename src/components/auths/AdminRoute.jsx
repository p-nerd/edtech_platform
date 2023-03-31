import { Navigate } from "react-router-dom";
import useIsAdmin from "../../hooks/useIsAdmin";

const AdminRoute = ({ children }) => {
    const isAdmin = useIsAdmin();

    return isAdmin ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;
