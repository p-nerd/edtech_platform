const ConfirmModal = ({ show, onClose, confirmText, title, description, onConfirm }) => {
    return (
        <div className={`relative z-20 ${show ? "" : "hidden"}`}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex items-center justify-center p-0 text-center">
                    <div className="bg-primary relative my-8 w-full max-w-lg transform overflow-hidden rounded-lg text-left text-white shadow-xl transition-all">
                        <div className="bg-primary p-6 px-4 pb-4 pt-5">
                            <div className="flex items-start">
                                <div className="bg-primary mx-0 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                                    <svg
                                        className="h-6 w-6 text-red-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-4 mt-0 text-left">
                                    <h3
                                        className="text-base font-semibold leading-6"
                                        id="modal-title"
                                    >
                                        {title}
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-200">{description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row-reverse px-6 py-3">
                            <button
                                onClick={onConfirm}
                                type="button"
                                className="ml-3 inline-flex w-auto justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                            >
                                {confirmText}
                            </button>
                            <button
                                onClick={onClose}
                                type="button"
                                className="mt-0 inline-flex w-auto justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
