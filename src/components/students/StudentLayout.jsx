import StudentNavbar from "../common/StudentNavbar";

const StudentLayout = ({ children }) => {
    return (
        <>
            <StudentNavbar />
            {children}
        </>
    );
};

export default StudentLayout;
