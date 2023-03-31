import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailField from "../components/auths/EmailField";
import PasswordField from "../components/auths/PasswordField";
import SubmitButton from "../components/auths/SubmitButton";
import AuthLayout from "../components/layouts/AuthLayout";
import useSetTitle from "../hooks/useSetTitle";

const Register = () => {
    useSetTitle("Register");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [register, { data, isLoading, isError, registerError: error2 }] = useRegisterMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            setError(registerError ? registerError?.error : "");
        }
        if (data?.accessToken && data?.user) {
            navigate("/inbox");
        }
    }, [data, isError]);

    const handleSubmit = () => {
        if (confirmPassword !== password) {
            setError("Password do not match!");
        } else {
            setError("");
            register({ name, email, password });
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setAgree(false);
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
                action="#"
                method="POST"
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
                <SubmitButton label="Create Account" />
            </form>
            {error && <Error message={error} />}
        </AuthLayout>
    );
};

export default Register;
