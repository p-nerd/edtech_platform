import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailField from "../components/auths/EmailField";
import PasswordField from "../components/auths/PasswordField";
import SubField from "../components/auths/SubField";
import SubmitButton from "../components/auths/SubmitButton";
import Error from "../components/common/Error";
import AuthLayout from "../components/layouts/AuthLayout";
import { useLoginMutation } from "../features/auth/authApi";
import useSetTitle from "../hooks/useSetTitle";
import useIsLoggedIn from "./../hooks/useIsLoggedIn";

const Login = () => {
    useSetTitle("Login");

    const navigate = useNavigate();
    const isLogin = useIsLoggedIn();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [login, { isLoading, error: loginError }] = useLoginMutation();

    useEffect(() => {
        if (loginError) {
            setError(loginError?.data);
        } else if (isLogin) {
            setEmail("");
            setPassword("");
            setError("");
            navigate("/player");
        }
    }, [isLogin, loginError]);

    const handleSubmit = () => {
        login({ email, password });
    };

    return (
        <AuthLayout label="Sign in to Student Account">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="mt-8 space-y-6"
            >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <EmailField email={email} setEmail={setEmail} />
                    <PasswordField password={password} setPassword={setPassword} />
                </div>
                <div className="flex items-center justify-between">
                    <SubField to="/admin/login" label="Are your admin?" />
                    <SubField to="/register" label="Create New Account" />
                </div>
                <SubmitButton disabled={isLoading} label="Sign in" />
                {error && <Error message={error} />}
            </form>
        </AuthLayout>
    );
};

export default Login;
