import { useMemo } from "react";
import { LayoutGrid, Stethoscope, Eye, Ear, type LucideIcon, ToolCaseIcon, Mountain } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { clinicService } from "../../services/clinicService";
import type { Category } from "../../type/clinic.types";

const configIcon: Record<string, LucideIcon> = {
    Semua: LayoutGrid,
    Umum: Stethoscope,
    Mata: Eye,
    Gigi: Mountain,
    THT: Ear,
};

export const BerandaCategory = () => {
    const { data: fetchedCategories, isLoading, isError } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: () => clinicService.getCategories(),
        staleTime: 1000 * 60 * 60, // 1 hour (jarang berubah)
    });

    const categories = useMemo(() => {
        if (!fetchedCategories) return [];
        return [...fetchedCategories];
    }, [fetchedCategories]);

    if (isLoading) {
        return (
            <div className="mt-14 flex justify-center py-10">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-teal-100 h-24 w-24"></div>
                    <div className="rounded-full bg-teal-100 h-24 w-24"></div>
                    <div className="rounded-full bg-teal-100 h-24 w-24"></div>
                    <div className="rounded-full bg-teal-100 h-24 w-24 hidden sm:block"></div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mt-14 text-center text-red-500 py-10">
                Gagal memuat kategori.
            </div>
        );
    }

    return (
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
            {categories.map((item) => {
                const Icon = configIcon[item.name] || LayoutGrid;

                return (
                    <div key={item.id} className="flex flex-col items-center group cursor-pointer">
                        <div className="w-24 h-24 rounded-full bg-teal-100/40 flex items-center justify-center 
                group-hover:bg-teal-100/60 group-hover:text-white transition duration-300 shadow-sm">
                            <Icon size={48} color="#0d9488" />
                        </div>

                        <p className="mt-4 text-teal-600 font-medium">
                            {item.name}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
