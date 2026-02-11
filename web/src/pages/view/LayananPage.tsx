import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { clinicService } from "../../services/clinicService";
import type { Booking } from "../../type/clinic.types";
import { CalendarIcon, MapPinIcon, PhoneIcon, Search } from "lucide-react";

export const LayananPage = () => {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce search for performance
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(handler);
    }, [search]);

    const { data: bookings, isLoading, isError, refetch } = useQuery<Booking[]>({
        queryKey: ["bookings", debouncedSearch],
        queryFn: () => clinicService.getBookings({ name: debouncedSearch }),
    });

    const calculateAge = (birthDate: string) => {
        if (!birthDate) return "N/A";
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6 pt-28 pb-20">
            <div className="container mx-auto">
                {/* ================= HEADER ================= */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Layanan <span className="text-teal-600">Klinik</span>
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Daftar booking pasien untuk pemeriksaan
                    </p>
                </div>

                {/* SEARCH BAR */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Cari nama pasien..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/2 px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all bg-white shadow-sm"
                    />
                </div>

                {/* CONTENT */}
                {isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm animate-pulse">
                                <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
                                <div className="h-4 w-1/2 bg-gray-100 rounded mb-2" />
                                <div className="mt-6 pt-4 border-t border-gray-50 space-y-3">
                                    <div className="h-4 w-full bg-gray-50 rounded" />
                                    <div className="h-4 w-full bg-gray-50 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-20">
                        <div className="text-red-500 mb-4 text-5xl">⚠️</div>
                        <h3 className="text-xl font-semibold text-gray-800">Gagal Memuat Data</h3>
                        <p className="text-gray-500 mt-2">Silakan coba lagi beberapa saat lagi.</p>
                        <button
                            onClick={() => refetch()}
                            className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition"
                        >
                            Coba Lagi
                        </button>
                    </div>
                ) : bookings?.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-3xl shadow-sm border-2 border-dashed border-gray-100">
                        <Search size={64} className="mx-auto mb-4" color="green" />
                        <h3 className="text-xl font-semibold text-gray-800">Tidak Ada Data</h3>
                        <p className="text-gray-500 mt-2">{search ? `Tidak ada data booking untuk nama "${search}"` : "Belum ada data booking"}</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings?.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 p-6 border border-gray-100 group"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-600 transition">
                                            {item.NamaLengkap}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-500 mt-1 inline-flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-semibold ${item.JenisKelamin === "Laki-laki" ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-600"
                                                }`}>
                                                {item.JenisKelamin}
                                            </span>
                                            • {calculateAge(item.TanggalLahir)} Tahun
                                        </p>
                                    </div>
                                    <div className="bg-teal-50 p-2 rounded-xl text-teal-600 font-semibold text-xs uppercase">
                                        Booking #{item.id}
                                    </div>
                                </div>

                                <div className="mt-6 space-y-1.5 border-t border-gray-50 text-sm text-gray-600">
                                    <div className="flex items-center gap-3">
                                        {/* <span className="text-teal-500">📞</span> */}
                                        <PhoneIcon size={16} />
                                        <span className="font-medium">{item.NoHp}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPinIcon size={16} />
                                        <span className="leading-relaxed">{item.AlamatLengkap}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CalendarIcon size={16} />
                                        <span>{new Date(item.TanggalLahir).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
