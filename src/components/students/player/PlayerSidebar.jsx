import { useDispatch } from "react-redux";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import { setActiveVideo } from "../../../features/videos/videosSlice";
import PlayerSidebarItem from "./PlayerSidebarItem";

const PlayerSidebar = () => {
    const dispatch = useDispatch();

    const { data: videos, isLoading, error } = useGetVideosQuery();

    const handleSetVideo = video => dispatch(setActiveVideo(video));

    return (
        <div className="bg-secondary col-span-full max-h-[570px] divide-y divide-slate-600/30 overflow-y-auto rounded-md border border-slate-50/10 p-4 lg:col-auto">
            {isLoading ? (
                <>Loading...</>
            ) : error ? (
                <>{error?.data}</>
            ) : videos && videos?.length === 0 ? (
                <>There is no videos</>
            ) : (
                <>
                    {videos?.map(video => (
                        <PlayerSidebarItem
                            key={video.id}
                            onClick={() => handleSetVideo(video)}
                            video={video}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default PlayerSidebar;
