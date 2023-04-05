import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../../features/auth/authApi";
import useSetTitle from "../../hooks/useSetTitle";
import Error from "../../components/common/Error";
import EmailField from "./../../components/auths/EmailField";
import PasswordField from "./../../components/auths/PasswordField";
import SubField from "./../../components/auths/SubField";
import SubmitButton from "./../../components/auths/SubmitButton";
import AuthLayout from "../../components/auths/AuthLayout";
import useIsAdmin from "./../../hooks/useIsAdmin";
import { selectAuthError } from "../../features/auth/authSelectors";

const AdminLogin = () => {
    useSetTitle("Admin Login");

    const navigate = useNavigate();
    const isAdmin = useIsAdmin();
    const authError = selectAuthError();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [adminLogin, { isLoading, error: loginError }] = useAdminLoginMutation();

    useEffect(() => {
        if (loginError) {
            setError(loginError?.data);
        } else if (authError) {
            setError(authError);
        } else if (isAdmin) {
            setEmail("");
            setPassword("");
            setError("");
            navigate("/admin");
        }
    }, [isAdmin, loginError, authError]);

    const handleSubmit = () => {
        adminLogin({ email, password });
    };

    return (
        <AuthLayout label="Sign in to Admin Account">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="mt-8 space-y-6"
            >
                <input type="hidden" name="remember" value="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <EmailField email={email} setEmail={setEmail} />
                    <PasswordField password={password} setPassword={setPassword} />
                </div>
                <div className="flex items-center justify-between">
                    <SubField to="/login" label="Are your student?" />
                    <SubField to="/forgot-password" label="Forgot your password?" />
                </div>
                <SubmitButton disabled={isLoading} label="Sign in" />
                {error && <Error message={error} />}
            </form>
        </AuthLayout>
    );
};

export default AdminLogin;
