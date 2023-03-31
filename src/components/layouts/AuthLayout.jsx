import learningportalSVG from "./../../assets/image/learningportal.svg";

const AuthLayout = ({ children, label }) => {
    return (
        <section className="bg-primary grid h-screen place-items-center py-6">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <img className="mx-auto h-12" src={learningportalSVG} />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        {label}
                    </h2>
                </div>
                {children}
            </div>
        </section>
    );
};

export default AuthLayout;
