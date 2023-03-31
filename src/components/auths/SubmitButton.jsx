const SubmitButton = ({ disabled, label }) => {
    return (
        <div>
            <button
                disabled={disabled}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
                {label}
            </button>
        </div>
    );
};

export default SubmitButton;
