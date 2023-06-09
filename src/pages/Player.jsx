import StudentLayout from "../components/students/StudentLayout";
import MainPlayer from "../components/students/player/MainPlayer";
import PlayerSidebar from "../components/students/player/PlayerSidebar";
import useSetTitle from "../hooks/useSetTitle";

const Player = () => {
    useSetTitle("Player");

    return (
        <StudentLayout>
            <section className="bg-primary py-6">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div className="grid grid-cols-3 gap-2 lg:gap-8">
                        <MainPlayer />
                        <PlayerSidebar />
                    </div>
                </div>
            </section>
        </StudentLayout>
    );
};

export default Player;
