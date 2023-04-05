import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDeleteAssignmentMutation } from "../../../features/assignment/assignmentApi";
import { setAssignmentEditId } from "../../../features/modal/modalSlice";
import ConfirmModal from "../../common/ConfirmModal";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";

const AssignmentItem = ({ assignment }) => {
    const { id, title, video_title, totalMark } = assignment;

    const dispatch = useDispatch();

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);

    const [deleteAssignment, { error }] = useDeleteAssignmentMutation();

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
    }, [error]);

    useEffect(() => {
        if (confirmDelete) {
            deleteAssignment(id);
            setOpenConfirmDeleteModal(false);
            setConfirmDelete(false);
        }
    }, [confirmDelete]);

    const handleClickDelete = () => {
        setOpenConfirmDeleteModal(true);
    };

    const handleEdit = () => {
        dispatch(setAssignmentEditId(id));
    };

    return (
        <tr>
            <td className="table-td">{title}</td>
            <td className="table-td">{video_title}</td>
            <td className="table-td">{totalMark}</td>
            <td className="table-td flex gap-x-2">
                {openConfirmDeleteModal ? (
                    <ConfirmModal
                        confirmText="Confirm"
                        title="Confirm Assignment Delete"
                        description="If you are sure hit confirm or if not hit cancel"
                        show={openConfirmDeleteModal}
                        onClose={() => setOpenConfirmDeleteModal(false)}
                        onConfirm={() => setConfirmDelete(true)}
                    />
                ) : (
                    ""
                )}
                <span onClick={handleClickDelete}>
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
