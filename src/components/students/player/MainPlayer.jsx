import { selectActiveVideo } from "../../../features/videos/videosSelectors";
import { convertDate } from "../../../utils/dateUtil";

const MainPlayer = () => {
    const activeVideo = selectActiveVideo();

    return (
        <>
            {activeVideo && (
                <div className="col-span-full w-full space-y-8 lg:col-span-2">
                    <iframe
                        width="100%"
                        className="aspect-video"
                        src={activeVideo?.url}
                        title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                            {activeVideo?.title}
                        </h1>
                        <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                            Uploaded on {convertDate(activeVideo.createdAt)}
                        </h2>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="border-cyan text-cyan hover:bg-cyan hover:text-primary rounded-full border px-3 py-1 text-sm font-bold"
                            >
                                এসাইনমেন্ট
                            </a>
                            <a
                                href="./Quiz.html"
                                className="border-cyan text-cyan hover:bg-cyan hover:text-primary rounded-full border px-3 py-1 text-sm font-bold"
                            >
                                কুইজে অংশগ্রহণ করুন
                            </a>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-400">
                            {activeVideo?.description}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default MainPlayer;
