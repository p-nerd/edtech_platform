import { useEffect, useState } from "react";
import { useEditAssignmentMarkMutation } from "../../../features/assignmentMark/assignmentMarkApi";
import { errorTost } from "../../../utils/tost";
import { convertDateTime } from "../../../utils/util";

const AssignmentMarkItem = ({ assignmentMark }) => {
    const { id, student_name, title, createdAt, totalMark, mark, repo_link, status } =
        assignmentMark;

    const [giveMark, setGiveMark] = useState(totalMark);

    const [editAssignmentMark, { error }] = useEditAssignmentMarkMutation();

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
    }, [error]);

    const handleChange = e => {
        if (e.target.value === "") {
            setGiveMark("");
        }
        const num = Number(e.target.value);
        if (num && num <= totalMark) setGiveMark(num);
    };

    const handleSubmit = () => {
        editAssignmentMark({
            id,
            data: {
                mark: giveMark,
                status: "published",
            },
        });
    };

    return (
        <tr>
            <td className="table-td">{title}</td>
            <td className="table-td">{convertDateTime(createdAt)}</td>
            <td className="table-td">{student_name}</td>
            <td className="table-td">{repo_link}</td>
            {status === "published" ? (
                <td className="table-td">{mark}</td>
            ) : (
                <td className="table-td input-mark">
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <input value={giveMark} onChange={handleChange} />
                        <button type="submit">
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-6 w-6 cursor-pointer text-green-500 hover:text-green-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                />
                            </svg>
                        </button>
                    </form>
                </td>
            )}
        </tr>
    );
};

export default AssignmentMarkItem;
