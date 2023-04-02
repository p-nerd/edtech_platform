import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setVideoEditId, toggleVideoEditOpen } from "../../features/modal/modalSlice";
import { useDeleteVideoMutation } from "../../features/videos/videosApi";
import { errorTost } from "../../utils/tost";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import { sliceStr } from "../../utils/util";

const VideoItem = ({ video }) => {
    const dispatch = useDispatch();
    const { id, title, url, description } = video;

    const [deleteVideo, { error }] = useDeleteVideoMutation();

    const handleDelete = () => {
        deleteVideo(id);
    };

    const handleEdit = () => {
        dispatch(toggleVideoEditOpen());
        dispatch(setVideoEditId(id));
    };

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
    }, [error]);

    return (
        <tr>
            <td className="table-td hover:text-[#34B5FD]">
                <Link to={url}>{title} </Link>
            </td>
            <td className="table-td">
                {sliceStr(description, 40)}
            </td>
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

export default VideoItem;
