import AdminNavbar from "../common/AdminNavbar";

const AdminLayout = ({ children }) => {
    return (
        <>
            <AdminNavbar />
            {children}
        </>
    );
};

export default AdminLayout;
