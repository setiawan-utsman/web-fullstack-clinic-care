import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/shadcn/Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/shadcn/Dialog";
import { clinicService } from "../../services/clinicService";
import { useNavigate } from "react-router-dom";

interface BookingForm {
    NamaLengkap: string;
    NoHp: string;
    JenisKelamin: "Laki-laki" | "Perempuan" | "";
    TanggalLahir: string;
    AlamatLengkap: string;
}

interface BookingModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const BookingModal = ({ open, onOpenChange }: BookingModalProps) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<BookingForm>({
        defaultValues: {
            NamaLengkap: "",
            NoHp: "",
            JenisKelamin: "",
            TanggalLahir: "",
            AlamatLengkap: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: BookingForm) => clinicService.createBooking(data),
        onSuccess: () => {
            toast.success("Booking berhasil!");
            navigate("/layanan");
            reset();
            onOpenChange(false);
        },
        onError: (error: any) => {
            toast.error("Terjadi kesalahan: " + (error?.message || "Gagal melakukan booking."));
        },
    });

    const onSubmit = (data: BookingForm) => {
        mutate(data);
    };

    const handleOpenChange = (val: boolean) => {
        if (!isPending) {
            onOpenChange(val);
            if (!val) {
                reset();
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-teal-700">Book Appointment</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 py-4">
                    {/* Nama Lengkap */}
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
                        <input
                            {...register("NamaLengkap", { required: "Nama lengkap wajib diisi" })}
                            placeholder="Masukkan nama lengkap"
                            className={`px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${errors.NamaLengkap ? "border-red-500 bg-red-50" : "border-gray-200"
                                }`}
                        />
                        {errors.NamaLengkap && (
                            <span className="text-xs text-red-500">{errors.NamaLengkap.message}</span>
                        )}
                    </div>

                    {/* No HP */}
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-gray-700">No HP</label>
                        <input
                            {...register("NoHp", {
                                required: "Nomor HP wajib diisi",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Nomor HP hanya boleh berisi angka"
                                }
                            })}
                            placeholder="Masukkan nomor HP"
                            className={`px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${errors.NoHp ? "border-red-500 bg-red-50" : "border-gray-200"
                                }`}
                        />
                        {errors.NoHp && (
                            <span className="text-xs text-red-500">{errors.NoHp.message}</span>
                        )}
                    </div>

                    {/* Jenis Kelamin */}
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-gray-700">Jenis Kelamin</label>
                        <select
                            {...register("JenisKelamin", { required: "Jenis kelamin wajib dipilih" })}
                            className={`px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all bg-white ${errors.JenisKelamin ? "border-red-500 bg-red-50" : "border-gray-200"
                                }`}
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                        {errors.JenisKelamin && (
                            <span className="text-xs text-red-500">{errors.JenisKelamin.message}</span>
                        )}
                    </div>

                    {/* Tanggal Lahir */}
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-gray-700">Tanggal Lahir</label>
                        <input
                            type="date"
                            {...register("TanggalLahir", { required: "Tanggal lahir wajib diisi" })}
                            className={`px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${errors.TanggalLahir ? "border-red-500 bg-red-50" : "border-gray-200"
                                }`}
                        />
                        {errors.TanggalLahir && (
                            <span className="text-xs text-red-500">{errors.TanggalLahir.message}</span>
                        )}
                    </div>

                    {/* Alamat Lengkap */}
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-gray-700">Alamat Lengkap</label>
                        <textarea
                            {...register("AlamatLengkap", { required: "Alamat lengkap wajib diisi" })}
                            placeholder="Masukkan alamat lengkap"
                            rows={3}
                            className={`px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none ${errors.AlamatLengkap ? "border-red-500 bg-red-50" : "border-gray-200"
                                }`}
                        />
                        {errors.AlamatLengkap && (
                            <span className="text-xs text-red-500">{errors.AlamatLengkap.message}</span>
                        )}
                    </div>

                    <DialogFooter className="mt-4 gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            disabled={isPending}
                            className="rounded-xl"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
                        >
                            {isPending ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
