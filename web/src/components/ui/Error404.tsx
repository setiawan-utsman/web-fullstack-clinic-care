import { Link } from "react-router-dom";


export const Error404 = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-white to-gray-100 px-6">

            <div className="text-center max-w-xl">

                {/* 404 Big Text */}
                <h1 className="text-7xl md:text-8xl font-extrabold text-teal-600 drop-shadow-sm">
                    404
                </h1>

                {/* Title */}
                <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-gray-800">
                    Halaman Tidak Ditemukan
                </h2>

                {/* Description */}
                <p className="mt-4 text-gray-600 leading-relaxed">
                    Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
                    Coba kembali ke beranda untuk melanjutkan.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                    >
                        Kembali ke Beranda
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
                    >
                        Kembali
                    </button>
                </div>

                {/* Decorative Divider */}
                <div className="mt-12 w-24 h-1 mx-auto bg-teal-500 rounded-full opacity-70"></div>

            </div>
        </div>
    );
}
