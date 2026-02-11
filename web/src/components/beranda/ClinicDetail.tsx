import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { clinicService } from "../../services/clinicService";
import type { Clinic } from "../../type/clinic.types";
import notFoundImg from "../../assets/image/not-found.png";
// import klinik1 from "../../assets/image/klinik1.jpg";
// import klinik2 from "../../assets/image/klinik2.jpg";
// import klinik3 from "../../assets/image/klinik3.jpg";

export const ClinicDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState("Info Umum");
    const [activeImage, setActiveImage] = useState<string>("");

    const { data, isLoading, isError, error } = useQuery<Clinic>({
        queryKey: ["clinic", id],
        queryFn: () => clinicService.getClinicById(id!),
        enabled: !!id,
    });

    // Update activeImage when data is loaded
    useEffect(() => {
        if (data?.images && data.images.length > 0) {
            setActiveImage("/assets" + data.images[0]);
        }
    }, [data]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 text-center">
                <div>
                    <h2 className="text-2xl font-bold text-red-600">Oops! Terjadi kesalahan</h2>
                    <p className="text-gray-600 mt-2">{(error as any)?.message || "Gagal memuat data klinik."}</p>
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <main className="bg-gray-50 min-h-screen pb-10 pt-10 px-6 rounded-b-3xl">

            {/* ================= IMAGE GALLERY ================= */}
            <section className="max-w-7xl mx-auto">
                <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200">
                    {activeImage ? (
                        <img
                            src={activeImage}
                            alt="clinic"
                            className="w-full h-[400px] object-contain transition-opacity duration-300"
                            onError={(e) => {
                                e.currentTarget.src = notFoundImg;
                            }}
                        />
                    ) : (
                        <div className="w-full h-[400px] flex items-center justify-center text-gray-400">
                            No image available
                        </div>
                    )}
                </div>

                {/* Thumbnails */}
                {data.images && data.images.length > 1 && (
                    <div className="flex gap-4 overflow-x-auto px-2 py-3.5  ">
                        {data.images.map((img: string, i: number) => (
                            <img
                                key={i}
                                src={"/assets" + img}
                                alt={`thumbnail-${i}`}
                                onClick={() => setActiveImage("/assets" + img)}
                                onError={(e) => {
                                    e.currentTarget.src = notFoundImg;
                                }}
                                className={`w-24 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all
                                ${activeImage === img ? "border-teal-600 scale-105" : "border-transparent opacity-70 hover:opacity-100"}`}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* ================= BASIC INFO ================= */}
            <section className="max-w-7xl mx-auto mt-4">
                <h1 className="text-3xl font-semibold text-gray-800">{data.name}</h1>

                <p className="text-teal-600 font-medium mt-1 uppercase tracking-wide text-sm">{data.type}</p>
                <p className="text-gray-500 mt-2 flex items-center gap-1">
                    📍 {data.address}
                </p>

                <div className="flex items-center gap-2 mt-2">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="font-semibold text-gray-700">{data.rating}</span>
                    <span className="text-gray-500">
                        ({data.totalReviews} reviews)
                    </span>
                </div>
            </section>

            {/* ================= TABS ================= */}
            <section className="max-w-7xl mx-auto mt-6">
                <div className="flex gap-6 border-b overflow-x-auto scrollbar-hide border-gray-200">
                    {data.tabs?.map((tab: string) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 whitespace-nowrap font-medium transition-all ${activeTab === tab
                                ? "border-b-2 border-teal-600 text-teal-600"
                                : "text-gray-500 hover:text-teal-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="mt-8">

                    {/* ================= INFO UMUM ================= */}
                    {activeTab === "Info Umum" && (
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Tentang Klinik</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Klinik {data.name} merupakan klinik terpercaya dengan layanan
                                medis profesional dan fasilitas lengkap. Kami berkomitmen memberikan
                                pelayanan kesehatan terbaik untuk Anda dan keluarga.
                            </p>
                        </div>
                    )}

                    {/* ================= SPECIALISTS ================= */}
                    {activeTab === "Spesialis" && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.specialists?.map((doc: any) => (
                                <div
                                    key={doc.id}
                                    className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center hover:shadow-md transition-shadow"
                                >
                                    <img
                                        src={doc.image}
                                        alt={doc.name}
                                        className="w-20 h-20 rounded-full object-cover border-2 border-teal-50"
                                    />

                                    <div>
                                        <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                                        <p className="text-teal-600 text-sm">
                                            {doc.specialization}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                                            ⭐ <span className="text-yellow-500 font-medium">{doc.rating}</span>
                                            <span>
                                                ({doc.totalReviews})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ================= FACILITIES ================= */}
                    {activeTab === "Fasilitas" && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {data.facilities?.map((facility: any, i: number) => (
                                <div
                                    key={i}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:bg-teal-50 transition-colors"
                                >
                                    {/* <div className="text-3xl mb-3">🏥</div> */}
                                    <p className="font-medium text-gray-700">{facility.name}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ================= REVIEWS ================= */}
                    {activeTab === "Review" && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {data.reviews?.map((review: any) => (
                                <div
                                    key={review.id}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{review.userName}</h4>
                                            <div className="mt-1 text-yellow-500 text-sm">
                                                {"⭐".repeat(review.rating)}
                                            </div>
                                        </div>
                                        <span className="text-gray-400 text-xs">
                                            {review.date}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mt-4 italic text-sm leading-relaxed">
                                        "{review.comment}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ================= LOCATION ================= */}
                    {activeTab === "Lokasi" && (
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center">
                            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                📍
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Alamat Lengkap</h3>
                            <p className="text-gray-600 mt-2">{data.address}</p>
                            <div className="mt-6 p-10 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400">
                                Interactive Map Placeholder
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </main>
    );
}
