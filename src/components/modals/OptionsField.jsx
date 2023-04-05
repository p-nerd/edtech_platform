const OptionsField = ({ options, value, setValue, label, id, ph, notRequired, className }) => {
    return (
        <div className={`flex w-full flex-col space-y-3 rounded bg-[#1E293B] p-4 ${className}`}>
            <label htmlFor={id}>{label}</label>
            <select
                required={!notRequired}
                className="rounded bg-black p-3 text-gray-400 outline-none"
                id={id}
                value={value}
                onChange={e => setValue(Number(e.target.value))}
            >
                <option hidden value="none">
                    {ph}
                </option>
                {options?.map(o => (
                    <option key={o.id} value={o.id}>
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

OptionsField.defaultProps = {
    notRequired: false,
    className: "",
};

export default OptionsField;
