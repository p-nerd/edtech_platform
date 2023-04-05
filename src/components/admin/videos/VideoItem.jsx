import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setVideoEditId } from "../../../features/modal/modalSlice";
import { useDeleteVideoMutation } from "../../../features/videos/videosApi";
import { setActiveVideo } from "../../../features/videos/videosSlice";
import { errorTost, sliceStr } from "../../../utils/commonUtil";
import ConfirmModal from "../../common/ConfirmModal";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";

const VideoItem = ({ video }) => {
    const { id, title, description } = video;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);

    const [deleteVideo, { error }] = useDeleteVideoMutation();

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
    }, [error]);

    useEffect(() => {
        if (confirmDelete) {
            deleteVideo(id);
            setOpenConfirmDeleteModal(false);
            setConfirmDelete(false);
        }
    }, [confirmDelete]);

    const handleClickDelete = () => {
        setOpenConfirmDeleteModal(true);
    };

    const handleEdit = () => {
        dispatch(setVideoEditId(id));
    };

    const handleTitleClick = () => {
        dispatch(setActiveVideo(video));
        navigate("/player");
    };

    return (
        <tr>
            <td onClick={handleTitleClick} className="table-td cursor-pointer hover:text-[#34B5FD]">
                {title}
            </td>
            <td className="table-td">{sliceStr(description, 40)}</td>
            <td className="table-td flex gap-x-2">
                {openConfirmDeleteModal ? (
                    <ConfirmModal
                        confirmText="Confirm"
                        title="Confirm Video Delete"
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

export default VideoItem;
