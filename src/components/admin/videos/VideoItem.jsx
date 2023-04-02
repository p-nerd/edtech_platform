import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setVideoEditId } from "../../../features/modal/modalSlice";
import { useDeleteVideoMutation } from "../../../features/videos/videosApi";
import { errorTost, sliceStr } from "../../../utils/commonUtil";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";

const VideoItem = ({ video }) => {
    const dispatch = useDispatch();
    const { id, title, url, description } = video;

    const [deleteVideo, { error }] = useDeleteVideoMutation();

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
    }, [error]);

    const handleDelete = () => deleteVideo(id);
    const handleEdit = () => dispatch(setVideoEditId(id));

    return (
        <tr>
            <td className="table-td hover:text-[#34B5FD]">
                <Link to={url}>{title} </Link>
            </td>
            <td className="table-td">{sliceStr(description, 40)}</td>
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
