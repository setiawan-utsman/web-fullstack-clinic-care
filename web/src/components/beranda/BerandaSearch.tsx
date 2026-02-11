import { SearchIcon } from "lucide-react";
import AsyncSelect from "react-select/async";
import { clinicService } from "../../services/clinicService";
import { useQueryClient } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router-dom";

interface IBerandaSearchProps {
    placeholder: string;
    path: string;
};

export const BerandaSearch = (props: IBerandaSearchProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loadOptions = (inputValue: string, callback: (options: any[]) => void) => {
        // Debounce manual menggunakan timeout
        const timeoutId = setTimeout(async () => {
            if (!inputValue) {
                callback([]);
                return;
            }

            try {
                const data = await queryClient.fetchQuery({
                    queryKey: ["clinics", { name: inputValue }],
                    queryFn: () => clinicService.getClinics({ name: inputValue }),
                    staleTime: 1000 * 60 * 5,
                });

                const options = data.map((clinic: any) => ({
                    value: clinic.id,
                    label: clinic.name,
                    ...clinic
                }));
                callback(options);
            } catch (error) {
                console.error("Error loading clinics:", error);
                callback([]);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    };

    const handleChange = (selectedOption: any) => {
        if (selectedOption) {
            navigate(`${props.path}/${selectedOption.value}`);
        }
    };

    return (
        <>
            <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-1 gap-3 shadow-sm hover:border-teal-300 transition-colors">
                <SearchIcon size={24} className="text-gray-400" />
                <div className="w-full">
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        loadOptions={(inputValue, callback) => {
                            loadOptions(inputValue, callback);
                        }}
                        placeholder={props.placeholder}
                        onChange={handleChange}
                        components={{
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => null,
                        }}
                        styles={{
                            control: (base) => ({
                                ...base,
                                backgroundColor: "transparent",
                                border: "none",
                                boxShadow: "none",
                                padding: "4px 0",
                                cursor: "text"
                            }),
                            input: (base) => ({
                                ...base,
                                color: "#374151", // text-gray-700
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: "#9CA3AF", // text-gray-400
                            }),
                            menu: (base) => ({
                                ...base,
                                borderRadius: "12px",
                                padding: "4px",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                border: "1px solid #E5E7EB",
                                zIndex: 50
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused ? "#F0FDFA" : "transparent",
                                color: state.isFocused ? "#0D9488" : "#374151",
                                padding: "10px 12px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                ":active": {
                                    backgroundColor: "#CCFBF1"
                                }
                            }),
                        }}
                    />
                </div>
            </div>
            <Outlet />
        </>

    );
}
