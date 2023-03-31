import { useState } from "react";
import EmailField from "./../../components/auths/EmailField";
import PasswordField from "./../../components/auths/PasswordField";
import SubField from "./../../components/auths/SubField";
import SubmitButton from "./../../components/auths/SubmitButton";
import AuthLayout from "./../../components/layouts/AuthLayout";
import useSetTitle from "../../hooks/useSetTitle";

const AdminLogin = () => {
    useSetTitle("Admin Login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <AuthLayout label="Sign in to Admin Account">
            <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <EmailField email={email} setEmail={setEmail} />
                    <PasswordField password={password} setPassword={setPassword} />
                </div>
                <SubField to="/forgot-password" label="Forgot your password?" />
                <SubmitButton label="Sign in" />
            </form>
        </AuthLayout>
    );
};

export default AdminLogin;
