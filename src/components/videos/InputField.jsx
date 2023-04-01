const InputField = ({ value, setValue, label, id, ph, type }) => {
    return (
        <div className="flex w-full flex-col space-y-3 rounded bg-[#1E293B] p-4">
            <label htmlFor={id}>{label}</label>
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                type={type}
                id={id}
                name={id}
                className="rounded bg-black p-3 outline-none"
                placeholder={ph}
            />
        </div>
    );
};

InputField.defaultProps = {
    type: "text",
};

export default InputField;
