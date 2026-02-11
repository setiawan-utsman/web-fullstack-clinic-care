import { useState } from "react";
import { BerandaSearch } from "../../components/beranda/BerandaSearch";
import { useParams } from "react-router-dom";
import { BerandaCategory } from "../../components/beranda/BerandaCategory";
import { BookingModal } from "../../components/beranda/BookingModal";
import { StarIcon } from "lucide-react";
import doctor from "../../assets/image/doctor1.png";
import { BerandaPromoCard } from "../../components/beranda/BerandaPromoCard";

export const BerandaPage = () => {
    const { id } = useParams();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    return (
        <>
            <div className="pb-20">
                <section className="relative bg-[#eef4f3] pb-24">
                    <div className="container mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
                        {/* LEFT CONTENT */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                <span className="text-teal-600">Partner Kepercayaan</span>
                                <br />
                                Anda dalam Mencari
                                <br />
                                Klinik Kesehatan
                            </h1>

                            <p className="mt-6 text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae
                                lacus dui. Integer imperdiet sem ac nisi ultrices semper non ac
                                dolor.
                            </p>

                            <button
                                onClick={() => setIsBookingModalOpen(true)}
                                className="mt-8 px-8 py-4 bg-teal-600 text-white rounded-xl shadow-lg hover:bg-teal-700 transition"
                            >
                                Book an appointment →
                            </button>
                        </div>

                        <div className="relative h-[200px] md:h-130">
                            <img
                                src={doctor}
                                alt="doctor"
                                className="rounded-3xl shadow-xl w-full object-cover h-full bg-gray-300/30"
                            />
                            <div className="absolute bottom-8 right-6 bg-white px-5 py-3 rounded-xl shadow-lg border border-teal-100 w-64">
                                <div className="flex -space-x-2">
                                    <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/40?img=1" />
                                    <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/40?img=2" />
                                    <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/40?img=3" />
                                    <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/40?img=4" />
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-[-20px] bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow text-sm flex items-center gap-2">
                                <StarIcon className="w-4 h-4 text-yellow-400" /> Mudah untuk buat janji
                            </div>
                        </div>

                    </div>
                    <div className={`container ${id ? "block" : "absolute"} mx-auto px-6 bottom-0 left-0 right-0 top-10/12 z-10`}>
                        <div className="bg-white border-2 border-teal-500 rounded-3xl p-10 shadow-xl">

                            <h2 className="text-2xl md:text-3xl font-semibold text-teal-700">
                                Cari Klinik Pilihan Anda
                            </h2>

                            <div className="mt-8">
                                <BerandaSearch placeholder="Cari klinik" path="/beranda/clinics" />
                            </div>

                        </div>
                    </div>
                </section>
                <section className={`max-w-7xl mx-auto text-center ${id ? "pt-10" : "pt-36"}`}>

                    <h2 className="text-3xl md:text-4xl font-semibold">
                        Kategori <span className="text-teal-600">Klinik</span>
                    </h2>

                    <BerandaCategory />
                </section>
                <section className="max-w-7xl mx-auto mt-24">
                    <h2 className="text-3xl md:text-4xl font-semibold text-center">
                        Promo <span className="text-teal-600">Menarik</span>
                    </h2>

                    <BerandaPromoCard />
                </section>
            </div>

            {/* Modal Booking */}
            <BookingModal open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen} />
        </>

    );
}
