import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useDeleteAssignmentMutation } from "../../../features/assignment/assignmentApi";
import { setAssignmentEditId } from "../../../features/modal/modalSlice";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";

const AssignmentItem = ({ assignment }) => {
    const { id, title, video_title, totalMark } = assignment;

    const dispatch = useDispatch();

    const [deleteAssignment, { error }] = useDeleteAssignmentMutation();

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
    }, [error]);

    const handleDelete = () => deleteAssignment(id);
    const handleEdit = () => dispatch(setAssignmentEditId(id));

    return (
        <tr>
            <td className="table-td">{title}</td>
            <td className="table-td">{video_title}</td>
            <td className="table-td">{totalMark}</td>
            <td className="table-td flex gap-x-2">
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

export default AssignmentItem;
