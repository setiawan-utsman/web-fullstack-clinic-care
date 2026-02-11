import { useState } from "react";
import { HospitalIcon, Menu, X } from "lucide-react";
import { MENU } from "../../assets/config/menu.config";
import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <header
                className="
        fixed top-0 left-0 w-full z-50
        backdrop-blur-xl
        bg-white/70
        shadow-[0_4px_20px_rgba(0,0,0,0.05)]
        transition-all duration-500"
            >
                <div className="relative container mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <HospitalIcon size={32} className="text-teal-600" />
                        <h1 className="text-xl md:text-2xl font-bold text-teal-700">
                            CliniCare
                        </h1>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex gap-10 text-gray-700 font-medium">
                        {MENU.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-teal-600 font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-teal-600 rounded-full"
                                        : "hover:text-teal-600 transition"
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <img
                                src="https://i.pravatar.cc/100"
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 text-gray-700 hover:text-teal-600 transition"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                <div
                    className={`
            lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl transition-all duration-300 transform
            ${isMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"}
          `}
                >
                    <nav className="flex flex-col p-6 gap-4 font-medium text-gray-700">
                        {MENU.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `py-2 px-4 rounded-xl transition ${isActive ? "bg-teal-50 text-teal-600 font-semibold" : "hover:bg-gray-50 hover:text-teal-600"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Backdrop for mobile menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            <main>
                <Outlet />
            </main>
        </>
    );
}
