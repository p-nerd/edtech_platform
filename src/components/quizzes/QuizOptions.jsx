import { useState } from "react";
import { errorTost } from "../../utils/tost";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import InputField from "../modals/InputField";
import OptionsField from "../modals/OptionsField";

const QuizOptions = ({ options, setOptions }) => {
    const [optionTitle, setOptionTitle] = useState("");
    const [isOptionCorrect, setIsOptionCorrect] = useState(0);
    const [optionUpdateId, setOptionUpdateId] = useState(0);

    const resetState = () => {
        setOptionTitle("");
        setIsOptionCorrect(0);
        setOptionUpdateId(0);
    };

    const handleAddOrUpdateOption = () => {
        if (optionUpdateId) {
            setOptions(prev =>
                prev?.map(option => {
                    if (option.id === optionUpdateId) {
                        return { ...option, option: optionTitle, isCorrect: isOptionCorrect };
                    }
                    return option;
                })
            );
            resetState();
            return;
        }
        if (options.length === 4) {
            errorTost("Maximum 4 option allowed! :)");
            return;
        }
        if (optionTitle === "") {
            return;
        }
        if (options.length === 0) {
            setOptions([{ id: 1, option: optionTitle, isCorrect: isOptionCorrect ? true : false }]);
            resetState();
        } else {
            setOptions(prev => [
                ...prev,
                {
                    id: prev[prev.length - 1].id + 1,
                    option: optionTitle,
                    isCorrect: isOptionCorrect ? true : false,
                },
            ]);
            resetState();
        }
    };

    const handleDelete = id => {
        setOptions(prev => prev.filter(p => p.id !== id));
    };

    const handleClickEdit = id => {
        const option = options?.find(o => o.id === id);
        setOptionUpdateId(id);
        setOptionTitle(option.option);
        setIsOptionCorrect(option.isCorrect ? 1 : 0);
    };

    return (
        <div className=" flex flex-col gap-4 rounded bg-black py-4">
            {options && options.length !== 0 && (
                <div className="flex flex-col gap-2 ">
                    {options.map(o => (
                        <div key={o.id} className="flex flex-col gap-2 rounded bg-[#1E293B] p-2 ">
                            <div className=" max-w-fit font-bold">{o.option}</div>
                            <div className="flex gap-3">
                                <span>
                                    This option is:{" "}
                                    <span className=" font-bold">
                                        {o.isCorrect ? "true" : "false"}
                                    </span>
                                </span>
                                <span onClick={() => handleClickEdit(o.id)}>
                                    <EditIcon />
                                </span>
                                <span onClick={() => handleDelete(o.id)}>
                                    <DeleteIcon />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {options?.length < 4 || optionUpdateId ? (
                <div className="flex space-x-3">
                    <div className="w-3/4">
                        <InputField
                            notRequired
                            value={optionTitle}
                            setValue={setOptionTitle}
                            label="Option"
                            id="option"
                            ph="Enter question answer option"
                        />
                    </div>
                    <div className="flex w-1/4 flex-col gap-4">
                        <OptionsField
                            options={[
                                { id: 1, label: "true" },
                                { id: 0, label: "false" },
                            ]}
                            value={isOptionCorrect}
                            setValue={setIsOptionCorrect}
                            label="Is Correct"
                            id="chooseOption"
                            ph="Choose option correct or wrong"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleAddOrUpdateOption}
                                className="w-full rounded-md border border-transparent bg-[#1E293B] px-4 py-2 text-sm font-medium text-white"
                                type="button"
                            >
                                {optionUpdateId ? "Update Option" : "Add Option"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default QuizOptions;
