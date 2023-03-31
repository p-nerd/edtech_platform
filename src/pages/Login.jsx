import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailField from "../components/auths/EmailField";
import PasswordField from "../components/auths/PasswordField";
import SubField from "../components/auths/SubField";
import SubmitButton from "../components/auths/SubmitButton";
import AuthLayout from "../components/layouts/AuthLayout";
import { useLoginMutation } from "../features/auth/authApi";
import useSetTitle from "../hooks/useSetTitle";
import useIsLoggedIn from "./../hooks/useIsLoggedIn";

const Login = () => {
    useSetTitle("Login");

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const isLogin = useIsLoggedIn();
    const [login, { isLoading, isError, error: loginError }] = useLoginMutation();

    useEffect(() => {
        if (isError) {
            setError(loginError ? loginError?.error : "");
        }
        if (isLogin) {
            navigate("/player");
        }
    }, [isLogin, isError]);

    const handleSubmit = () => {
        setError("");
        login({ email, password });
        setEmail("");
        setPassword("");
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
                <SubField to="/register" label="Create New Account" />
                <SubmitButton disabled={isLoading} label="Sign in" />
                {error && <Error message={error} />}
            </form>
        </AuthLayout>
    );
};

export default Login;
