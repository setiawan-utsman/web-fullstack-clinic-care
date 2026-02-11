import { PROMOS } from "../../assets/config/data.config";
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/shadcn/Carousel";
import notFoundImage from "../../assets/image/not-found.png";

export const BerandaPromoCard = () => {
    return (
        <div className="mt-14 px-12 pb-10">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {PROMOS.map((promo) => (
                        <CarouselItem key={promo.id} className="md:basis-1/2 lg:basis-1/2">
                            <div className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg mx-2">
                                <img
                                    src={promo.image}
                                    alt={promo.title}
                                    className="w-full h-[380px] object-cover group-hover:scale-105 transition duration-500"
                                    onError={(e) => (e.currentTarget.src = notFoundImage)}
                                />

                                <div className="absolute inset-0 bg-black/30"></div>

                                <div className="absolute inset-0 flex flex-col justify-center px-10 text-white">
                                    <h3 className="text-3xl font-semibold leading-tight">
                                        {promo.title.split('?').length > 1 ? (
                                            <>
                                                {promo.title.split('?')[0]}?<br />{promo.title.split('?')[1]}
                                            </>
                                        ) : promo.title.includes("Off") ? (
                                            <>
                                                {promo.title.split("On")[0]} <br /> On {promo.title.split("On")[1]}
                                            </>
                                        ) : (
                                            promo.title
                                        )}
                                    </h3>

                                    <p className="mt-4 text-gray-200">
                                        {promo.description}
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12" />
                <CarouselNext className="hidden md:flex -right-12" />
                <CarouselDots className="mt-8" />
            </Carousel>
        </div>
    );
}
