const Modal = ({ children, show, onClose, title }) => {
    return (
        <div className={`relative z-10 ${show ? "" : "hidden"}`}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed  inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="bg-primary relative w-1/2 transform overflow-hidden rounded-lg text-left text-white shadow-xl transition-all">
                        <div className="flex flex-col p-5 pt-7">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl">{title}</h2>
                                <button
                                    onClick={() => onClose()}
                                    type="button"
                                    className="mt-3 inline-flex w-28 justify-center rounded-md bg-[#34B5FD] px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm sm:mt-0 sm:w-auto"
                                >
                                    Close
                                </button>
                            </div>
                            <div className="mt-5">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
