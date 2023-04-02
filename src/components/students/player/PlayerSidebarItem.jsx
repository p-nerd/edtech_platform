import { selectActiveVideo } from "../../../features/videos/videosSelectors";

const PlayerSidebarItem = ({ video, onClick }) => {
    const { id, title, views, duration } = video;

    const activeVideo = selectActiveVideo();

    return (
        <div
            onClick={onClick}
            className="flex w-full cursor-pointer flex-row gap-2 p-2 py-3 hover:bg-slate-900"
        >
            <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={activeVideo?.id === id ? "h-3 w-3" : "h-6 w-6"}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                />
            </svg>
            <div className="flex w-full flex-col">
                <div>
                    <p className="text-sm font-medium text-slate-50">{title}</p>
                </div>
                <div>
                    <span className="mt-1 text-xs text-gray-400">{duration} Mins</span>
                    <span className="mt-1 text-xs text-gray-400"> | </span>
                    <span className="mt-1 text-xs text-gray-400">{views} views</span>
                </div>
            </div>
        </div>
    );
};

export default PlayerSidebarItem;
