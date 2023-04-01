import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailField from "../components/auths/EmailField";
import PasswordField from "../components/auths/PasswordField";
import SubmitButton from "../components/auths/SubmitButton";
import Error from "../components/common/Error";
import AuthLayout from "../components/layouts/AuthLayout";
import { useRegisterMutation } from "../features/auth/authApi";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import useSetTitle from "../hooks/useSetTitle";
import SubField from "../components/auths/SubField";

const Register = () => {
    useSetTitle("Register");

    const navigate = useNavigate();
    const isLogin = useIsLoggedIn();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [register, { isLoading, error: registerError }] = useRegisterMutation();

    useEffect(() => {
        if (registerError) {
            setError(registerError?.data);
        } else if (isLogin) {
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setError("");
            navigate("/player");
        }
    }, [isLogin, registerError]);

    const handleSubmit = () => {
        if (confirmPassword !== password) {
            setError("Password do not match!");
        } else {
            register({ name, email, password });
        }
    };

    return (
        <AuthLayout label="Create Your New Account">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="mt-8 space-y-6"
            >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="name" className="sr-only">
                            {name}
                        </label>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="name"
                            name="name"
                            type="name"
                            autoComplete="name"
                            required
                            className="login-input rounded-t-md"
                            placeholder="Student Name"
                        />
                    </div>
                    <EmailField isNotRounded email={email} setEmail={setEmail} />
                    <PasswordField isNotRounded password={password} setPassword={setPassword} />
                    <div>
                        <label htmlFor="confirm-password" className="sr-only">
                            Confirm Password
                        </label>
                        <input
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            autoComplete="confirm-password"
                            required
                            className="login-input rounded-b-md"
                            placeholder="Confirm Password"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <SubField to="/admin/login" label="Are your admin?" />
                    <SubField to="/login" label="Are you student?" />
                </div>
                <SubmitButton disabled={isLoading} label="Create Account" />
                {error && <Error message={error} />}
            </form>
        </AuthLayout>
    );
};

export default Register;
