import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Layout = () => {
    const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="h-[90px]">
            <Navbar />
            </div>
            <main className="flex justify-center w-full px-4 md:px-8 py-4 ">    
                {isOpen ? (
                    <aside className="w-[256px] transition-all hidden md:block">
                        <Sidebar />
                    </aside>
                ) : ""}
                <section className="flex-1">
                    <Outlet />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
