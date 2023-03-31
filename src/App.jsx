import { Navigate, Route, Routes } from "react-router-dom";
import AssignmentMarks from "./pages/admin/AssignmentMarks";
import Assignments from "./pages/admin/Assignments";
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import Quizzes from "./pages/admin/Quizzes";
import Videos from "./pages/admin/Videos";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Player from "./pages/Player";
import Quiz from "./pages/Quiz";
import Register from "./pages/Register";
import AdminRoute from "./components/auths/AdminRoute";
import StudentRoute from "./components/auths/StudentRoute";
import useAuthCheck from "./hooks/useAuthCheck";

const App = () => {
    const authChecked = useAuthCheck();

    return (
        <>
            {!authChecked ? (
                <>Loading...</>
            ) : (
                <>
                    <Routes>
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route
                            path="/admin"
                            element={
                                <AdminRoute>
                                    <Dashboard />
                                </AdminRoute>
                            }
                        />
                        <Route
                            path="/admin/videos"
                            element={
                                <AdminRoute>
                                    <Videos />
                                </AdminRoute>
                            }
                        />
                        <Route
                            path="/admin/assignments"
                            element={
                                <AdminRoute>
                                    <Assignments />
                                </AdminRoute>
                            }
                        />
                        <Route
                            path="/admin/quizzes"
                            element={
                                <AdminRoute>
                                    <Quizzes />
                                </AdminRoute>
                            }
                        />
                        <Route
                            path="/admin/assignment-marks"
                            element={
                                <AdminRoute>
                                    <AssignmentMarks />
                                </AdminRoute>
                            }
                        />

                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/leaderboard"
                            element={
                                <StudentRoute>
                                    <Leaderboard />
                                </StudentRoute>
                            }
                        />
                        <Route
                            path="/player"
                            element={
                                <StudentRoute>
                                    <Player />
                                </StudentRoute>
                            }
                        />
                        <Route
                            path="/quiz"
                            element={
                                <StudentRoute>
                                    <Quiz />
                                </StudentRoute>
                            }
                        />
                    </Routes>
                </>
            )}
        </>
    );
};

export default App;
