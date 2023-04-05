import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoute from "./components/auths/AdminRoute";
import StudentRoute from "./components/auths/StudentRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Player from "./pages/Player";
import Quiz from "./pages/Quiz";
import Register from "./pages/Register";
import AdminLogin from "./pages/admin/AdminLogin";
import AssignmentMarks from "./pages/admin/AssignmentMarks";
import Assignments from "./pages/admin/Assignments";
import Dashboard from "./pages/admin/Dashboard";
import Quizzes from "./pages/admin/Quizzes";
import Videos from "./pages/admin/Videos";

const adminRoute = (path, element) => {
    return <Route path={path} element={<AdminRoute>{element}</AdminRoute>} />;
};

const studentRoute = (path, element) => {
    return <Route path={path} element={<StudentRoute>{element}</StudentRoute>} />;
};

const publicRoute = (path, element) => {
    return <Route path={path} element={element} />;
};

const App = () => {
    const authChecked = useAuthCheck();

    return (
        <>
            {!authChecked ? (
                <>Loading...</>
            ) : (
                <Routes>
                    {publicRoute("/", <Navigate to="/login" />)}
                    {publicRoute("/admin/login", <AdminLogin />)}
                    {publicRoute("/login", <Login />)}
                    {publicRoute("/register", <Register />)}

                    {adminRoute("/admin", <Dashboard />)}
                    {adminRoute("/admin/videos", <Videos />)}
                    {adminRoute("/admin/assignments", <Assignments />)}
                    {adminRoute("/admin/quizzes", <Quizzes />)}
                    {adminRoute("/admin/assignment-marks", <AssignmentMarks />)}

                    {studentRoute("/quiz/:id", <Quiz />)}
                    {studentRoute("/leaderboard", <Leaderboard />)}
                    {studentRoute("/player", <Player />)}
                </Routes>
            )}
        </>
    );
};

export default App;
