const EmailField = ({ isNotRounded, email, setEmail }) => {
    return (
        <div>
            <label htmlFor="email-address" className="sr-only">
                Email address
            </label>
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`login-input ${isNotRounded ? "" : "rounded-t-md"}`}
                placeholder="Email address"
            />
        </div>
    );
};

EmailField.defaultProps = {
    isNotRounded: false,
};

export default EmailField;
