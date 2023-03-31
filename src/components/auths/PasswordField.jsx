const PasswordField = ({ isNotRounded, password, setPassword }) => {
    return (
        <div>
            <label htmlFor="password" className="sr-only">
                Password
            </label>
            <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`login-input ${isNotRounded ? "" : "rounded-b-md"}`}
                placeholder="Password"
            />
        </div>
    );
};

PasswordField.defaultProps = {
    isNotRounded: false,
};

export default PasswordField;
