const TextAreaField = ({ value, setValue, label, id, ph }) => {
    return (
        <div className="flex flex-col space-y-3 rounded bg-[#1E293B] p-4">
            <label htmlFor={id}>{label}</label>
            <textarea
                value={value}
                onChange={e => setValue(e.target.value)}
                name={id}
                id={id}
                className="rounded bg-black p-3 outline-none"
                placeholder={ph}
                rows={3}
            ></textarea>
        </div>
    );
};

export default TextAreaField;
