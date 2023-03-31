import StudentLayout from "../components/layouts/StudentLayout";

const Player = () => {
    return (
        <StudentLayout>
            <section className="bg-primary py-6">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div className="grid grid-cols-3 gap-2 lg:gap-8">
                        <div className="col-span-full w-full space-y-8 lg:col-span-2">
                            <iframe
                                width="100%"
                                className="aspect-video"
                                src="https://www.youtube.com/embed/56zUkaXJnUA"
                                title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                                frameBorder={0}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            <div>
                                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                                    Things I wish I knew as a Junior Web Developer - Sumit Saha -
                                    BASIS SoftExpo 2023
                                </h1>
                                <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                                    Uploaded on 23 February 2020
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
                                    আপনারা যারা বিগিনার হিসেবে রিয়্যাক্ট জেস নিয়ে কাজ করা শুরু
                                    করেছেন, তারা রিয়্যাক্ট এর বেশ কিছু কনসেপ্ট ঠিক মতো আয়ত্ত না
                                    করতে পারার কারণে বিচিত্র কিছু সমস্যার সম্মুখীন হন এবং শেষ
                                    পর্যন্ত বুঝতে না পেরে হতাশ হয়ে পড়েন। তাদের জন্যই এই ভিডিওটি।
                                    এই ভিডিওতে আমি এমন ১০টি সমস্যার কথা তুলে ধরেছি যেগুলো বিগিনার
                                    হিসেবে আপনারা অহরহ সম্মুখীন হবেন। আশা করি ভিডিওটি দেখলে আপনাদের
                                    এই সমস্যাগুলো নিয়ে আর কনফিউশন থাকবেনা।
                                </p>
                            </div>
                        </div>
                        <div className="bg-secondary col-span-full max-h-[570px] divide-y divide-slate-600/30 overflow-y-auto rounded-md border border-slate-50/10 p-4 lg:col-auto">
                            <div className="flex w-full cursor-pointer flex-row gap-2 p-2 py-3 hover:bg-slate-900">
                                {/* Thumbnail */}
                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
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
                                {/* Description */}
                                <div clas="flex flex-col w-full">
                                    <a href="#">
                                        <p className="text-sm font-medium text-slate-50">
                                            Things I wish I knew as a Junior Web Developer - Sumit
                                            Saha - BASIS SoftExpo 2023
                                        </p>
                                    </a>
                                    <div>
                                        <span className="mt-1 text-xs text-gray-400">
                                            34.5 Mins
                                        </span>
                                        <span className="mt-1 text-xs text-gray-400"> | </span>
                                        <span className="mt-1 text-xs text-gray-400">
                                            241K views
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full cursor-pointer flex-row gap-2 p-2 hover:bg-slate-900">
                                {/* Thumbnail */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
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
                                {/* Description */}
                                <div clas="flex flex-col w-full">
                                    <a href="#">
                                        <p className="text-sm font-medium text-slate-50">
                                            Introduction to Couse
                                        </p>
                                    </a>
                                    <div>
                                        <span className="mt-1 text-xs text-gray-400">
                                            34.5 Mins
                                        </span>
                                        <span className="mt-1 text-xs text-gray-400"> | </span>
                                        <span className="mt-1 text-xs text-gray-400">
                                            241K views
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full cursor-pointer flex-row gap-2 p-2 hover:bg-slate-900">
                                {/* Thumbnail */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
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
                                {/* Description */}
                                <div clas="flex flex-col w-full">
                                    <a href="#">
                                        <p className="text-sm font-medium text-slate-50">
                                            Introduction to Couse
                                        </p>
                                    </a>
                                    <div>
                                        <span className="mt-1 text-xs text-gray-400">
                                            34.5 Mins
                                        </span>
                                        <span className="mt-1 text-xs text-gray-400"> | </span>
                                        <span className="mt-1 text-xs text-gray-400">
                                            241K views
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </StudentLayout>
    );
};

export default Player;
