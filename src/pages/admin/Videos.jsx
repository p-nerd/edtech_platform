import AdminLayout from "../../components/layouts/AdminLayout";
import AddVideoModal from "../../components/admin/videos/AddVideoModal";
import EditVideoModal from "../../components/admin/videos/EditVideoModal";
import VideoItem from "../../components/admin/videos/VideoItem";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import useSetTitle from "../../hooks/useSetTitle";

const Videos = () => {
    useSetTitle("Video List");

    const { data: videos, isLoading, error } = useGetVideosQuery();

    return (
        <AdminLayout>
            <section className="bg-primary py-6">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="bg-opacity-10 px-3 py-20">
                        <AddVideoModal />
                        <EditVideoModal />
                        <div className="mt-4 overflow-x-auto">
                            {isLoading ? (
                                <>Loading...</>
                            ) : error ? (
                                <>{error?.data}</>
                            ) : videos && videos?.length === 0 ? (
                                <>There is no videos</>
                            ) : (
                                <table className="divide-y-1 w-full divide-gray-600 text-base">
                                    <thead>
                                        <tr>
                                            <th className="table-th">Video Title</th>
                                            <th className="table-th">Description</th>
                                            <th className="table-th">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-600/50">
                                        {videos.map(video => (
                                            <VideoItem key={video.id} video={video} />
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
};

export default Videos;
