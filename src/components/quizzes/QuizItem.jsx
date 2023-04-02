import { useEffect } from "react";
import { useDeleteQuizMutation } from "../../features/quizzes/quizzesApi";
import { sliceStr } from "../../utils/util";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";

const QuizItem = ({ quiz }) => {
    const { id, question, video_title } = quiz;

    const [deleteQuiz, { error }] = useDeleteQuizMutation();

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
    }, [error]);

    const handleDelete = () => deleteQuiz(id);

    return (
        <tr>
            <td className="table-td">{sliceStr(question, 70)}</td>
            <td className="table-td">{sliceStr(video_title, 40)}</td>
            <td className="table-td flex justify-center gap-x-2">
                <span onClick={handleDelete}>
                    <DeleteIcon />
                </span>
                <span>
                    <EditIcon />
                </span>
            </td>
        </tr>
    );
};

export default QuizItem;
