import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setQuizEditId } from "../../../features/modal/modalSlice";
import { useDeleteQuizMutation } from "../../../features/quizzes/quizzesApi";
import { sliceStr } from "../../../utils/commonUtil";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";

const QuizItem = ({ quiz }) => {
    const { id, question, video_title } = quiz;

    const dispatch = useDispatch();

    const [deleteQuiz, { error }] = useDeleteQuizMutation();

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
    }, [error]);

    const handleDelete = () => {
        deleteQuiz(id);
    };

    const handleEdit = () => {
        dispatch(setQuizEditId(id));
    };

    return (
        <tr>
            <td className="table-td">{sliceStr(question, 70)}</td>
            <td className="table-td">{sliceStr(video_title, 40)}</td>
            <td className="table-td flex justify-center gap-x-2">
                <span onClick={handleDelete}>
                    <DeleteIcon />
                </span>
                <span onClick={handleEdit}>
                    <EditIcon />
                </span>
            </td>
        </tr>
    );
};

export default QuizItem;
